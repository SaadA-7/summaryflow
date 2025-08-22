from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import logging
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load DistilBART model (lightweight, fast)
try:
    summarizer = pipeline(
        "summarization", 
        model="sshleifer/distilbart-cnn-12-6"
    )
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Model load failed: {e}")
    summarizer = None

def chunk_text(text, max_chars=800):
    """Split text into processable chunks"""
    sentences = text.split('. ')
    chunks = []
    current = []
    current_length = 0
    
    for sentence in sentences:
        sentence_length = len(sentence)
        if current_length + sentence_length > max_chars and current:
            chunks.append('. '.join(current) + '.')
            current = [sentence]
            current_length = sentence_length
        else:
            current.append(sentence)
            current_length += sentence_length
    
    if current:
        chunks.append('. '.join(current))
    
    return chunks

@app.route('/')
def health():
    return jsonify({"status": "ok", "model_ready": summarizer is not None})

@app.route('/api/summarize', methods=['POST'])
def summarize():
    if not summarizer:
        return jsonify({"error": "Model unavailable"}), 500
    
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        if len(text) < 100:
            return jsonify({"error": "Text too short (min 100 chars)"}), 400
        
        # Process long texts in chunks
        if len(text) > 800:
            chunks = chunk_text(text)
            summaries = []
            
            for chunk in chunks:
                if len(chunk) > 50:  # Skip very short chunks
                    result = summarizer(chunk, 
                                      max_length=100, 
                                      min_length=20, 
                                      do_sample=False)
                    summaries.append(result[0]['summary_text'])
            
            final_summary = ' '.join(summaries)
        else:
            result = summarizer(text, 
                              max_length=min(130, len(text.split())//2), 
                              min_length=20, 
                              do_sample=False)
            final_summary = result[0]['summary_text']
        
        return jsonify({
            "summary": final_summary,
            "compression_ratio": round(len(final_summary) / len(text), 2)
        })
        
    except Exception as e:
        logger.error(f"Summarization error: {e}")
        return jsonify({"error": "Summarization failed"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)