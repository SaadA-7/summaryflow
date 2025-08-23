# SwiftDigest - AI Text Summarizer

A modern web application that generates concise summaries from long text using pre-trained transformer models. Built with React, Flask, and Hugging Face Transformers for fast, accurate text summarization.

## 🌟 Features

⚡ Lightning Fast: Powered by DistilBART for quick summarization
📄 Smart Chunking: Handles documents of any length automatically
🎨 Modern UI: Beautiful glassmorphism design with responsive layout
🔒 Privacy First: No data storage, secure client-side processing
📱 Mobile Ready: Fully responsive across all devices

## 🛠 Tech Stack
ComponentTechnologyFrontendReact 18 + Vite + Tailwind CSSBackendPython Flask + Hugging Face TransformersAI ModelDistilBART (lightweight & efficient)DeploymentVercel (Frontend + Serverless Functions)StylingTailwind CSS v3 with custom animations

### 📁 Project Structure
SwiftDigest/
├── 📂 frontend/
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── 📂 backend/
│   ├── app.py
│   └── requirements.txt
├── vercel.json
├── .gitignore
└── README.md

### 🚀 Quick Start

## Prerequisites

Node.js 16+
Python 3.9+
Git


1. Clone Repository
bashgit clone https://github.com/yourusername/SwiftDigest.git
cd SwiftDigest

2. Backend Setup
bash# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
Backend will run on: http://localhost:5000

3. Frontend Setup
bash# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
Frontend will run on: http://localhost:5173

4. Open Application
Visit http://localhost:5173 in your browser

📦 Installation Details
Backend Dependencies
bashFlask==3.0.0
Flask-CORS==4.0.0
transformers==4.36.0
torch==2.1.0
Frontend Dependencies
bash# Core dependencies
npm install


# Tailwind CSS v3
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss@3 init -p

## 🌐 Deployment to Vercel
1. Push to GitHub
bashgit add .
git commit -m "Initial commit: SwiftDigest implementation"
git branch -M main
git remote add origin https://github.com/yourusername/SwiftDigest.git
git push -u origin main

2. Deploy to Vercel
Go to vercel.com
Click "New Project"
Import your GitHub repository
Vercel will auto-detect the configuration
Click "Deploy"

3. Environment Variables (Optional)
In Vercel dashboard → Project Settings → Environment Variables:
envPYTHON_VERSION=3.9
NODE_VERSION=18

## 🎯 Usage Guide
Basic Usage

Input Text: Paste your long text, article, or document
Click Summarize: AI processes your content
Get Summary: Receive a concise, coherent summary


## Supported Content Types

📰 News Articles: Get key points from long news pieces
📄 Research Papers: Generate abstracts from academic content
📊 Business Reports: Create executive summaries
📧 Email Threads: Summarize long conversation chains
📚 Blog Posts: Extract main ideas from lengthy articles

Text Length Recommendations
Input LengthProcessing TimeQuality100-800 chars< 2 secondsExcellent800-2000 chars2-5 secondsVery Good2000+ chars5-10 secondsGood (chunked)

## ⚙️ Configuration
Model Configuration
The app uses DistilBART (sshleifer/distilbart-cnn-12-6) for optimal performance:
python# backend/app.py
summarizer = pipeline(
    "summarization", 
    model="sshleifer/distilbart-cnn-12-6"
)

Alternative Models
For different use cases, you can replace with:
ModelUse CaseSizeSpeedfacebook/bart-large-cnnHigh qualityLargeSlowergoogle/pegasus-xsumNews articlesMediumMediummicrosoft/DialoGPT-mediumConversationsMediumFast

Frontend Customization
Colors & Themes:
css/* src/index.css */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
}
Animation Settings:
javascript// tailwind.config.js
theme: {
  extend: {
    animation: {
      'pulse-slow': 'pulse 3s ease-in-out infinite',
      'fade-in': 'fadeIn 0.5s ease-in-out',
    }
  }
}

### 🔧 API Reference
POST /api/summarize
Summarize input text using AI model.
Request:
json{
  "text": "Your long text content here..."
}
Response:
json{
  "summary": "Generated summary text...",
  "compression_ratio": 0.25
}
Error Response:
json{
  "error": "Error message description"
}
GET /
Health check endpoint.
Response:
json{
  "status": "ok",
  "model_ready": true
}

## 🧪 Testing
Manual Testing

Short Text: Test with < 100 characters (should show error)
Medium Text: Test with 200-800 characters
Long Text: Test with 2000+ characters (chunking)
Empty Input: Test with empty string
Special Characters: Test with emojis, symbols

Performance Testing
bash# Test API endpoint directly
curl -X POST http://localhost:5000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text": "Your test content here..."}'
🐛 Troubleshooting
Common Issues
Model Loading Errors
Error: Failed to load model
Solution: Ensure sufficient memory (2GB+) and stable internet connection
CORS Errors
Access to fetch blocked by CORS policy
Solution: Check Flask-CORS configuration in backend/app.py
Build failed with exit code 1
Solutions:

Check Node.js version (16+)
Ensure all dependencies are listed

Timeout Errors
Function timeout after 30s
Solutions:

Reduce input text length
Optimize model processing

Memory Issues
If encountering memory problems:
python# Reduce model precision
summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    torch_dtype=torch.float16  # Use half precision
)
Debug Mode
Enable debug logging:
python# backend/app.py
import logging
logging.basicConfig(level=logging.DEBUG)

## 
🔐 Security & Privacy
Data Privacy

❌ No Data Storage: Text is never saved or logged
🔒 Secure Processing: All processing happens in memory
🛡️ No Tracking: No user analytics or tracking
⚡ Ephemeral: Data is destroyed after processing

### Security Features

Input Validation: Prevents malicious input
CORS Protection: Configured for safe cross-origin requests
Error Sanitization: Sensitive error details are hidden
Rate Limiting: Built-in protection against abuse

## 📈 Performance Optimization
### Frontend Optimizations

Code Splitting: Vite automatically splits bundles
Lazy Loading: Components load on demand
CSS Optimization: Tailwind purges unused styles
Image Optimization: Responsive images and lazy loading

### Backend Optimizations

Model Caching: Model stays loaded in memory
Efficient Chunking: Smart text splitting algorithms
Error Recovery: Graceful handling of processing failures
Connection Pooling: Optimized for concurrent requests

## 🤝 Contributing
Welcomed contributions! Please follow these steps:

Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit your changes: git commit -m 'Add amazing feature'
Push to branch: git push origin feature/amazing-feature
Open a Pull Request

Development Guidelines

Code Style: Follow existing patterns
Testing: Test all new features
Documentation: Update README for new features
Performance: Consider impact on loading times


## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👥 Authors

Saad Ahmad - Initial work - github.com/SaadA-7/
For research & educational purposes
