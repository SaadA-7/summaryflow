import { useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const [summary, setSummary] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSummarize = async () => {
    if (!text.trim()) return setError('Please enter text to summarize')
    
    setLoading(true)
    setError('')
    setSummary('')

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Summarization failed')
      }

      setSummary(data.summary)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setText('')
    setSummary('')
    setError('')
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            Summary<span className="text-yellow-300">Flow</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Transform lengthy text into concise summaries using AI
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-yellow-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <h2 className="text-2xl font-semibold text-white">Input Text</h2>
            </div>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article, document, or long text here..."
              className="w-full h-80 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all"
            />
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-300">{text.length} characters</span>
              <div className="space-x-3">
                <button
                  onClick={clear}
                  className="px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleSummarize}
                  disabled={loading || !text.trim()}
                  className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Summarize'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-yellow-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-2xl font-semibold text-white">Summary</h2>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-xl mb-4">
                {error}
              </div>
            )}

            <div className="h-80 bg-white/10 border border-white/20 rounded-xl p-4 overflow-y-auto">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-pulse-slow mb-4">
                      <svg className="w-12 h-12 mx-auto text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <p className="text-gray-300">AI is analyzing your text...</p>
                  </div>
                </div>
              ) : summary ? (
                <p className="text-white leading-relaxed">{summary}</p>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Your summary will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Fast Processing</h4>
              <p className="text-gray-300">Lightweight DistilBART model for quick results</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Smart Chunking</h4>
              <p className="text-gray-300">Handles long documents automatically</p>
            </div>
            
            <div className="glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Privacy First</h4>
              <p className="text-gray-300">No data storage, secure processing</p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-16 text-gray-300">
          <p>&copy; 2025 SummaryFlow. Powered by DistilBART transformer model.</p>
        </footer>
      </div>
    </div>
  )
}

export default App