import { useState } from 'react';
import { Send, Bot, User, Sparkles, Lightbulb } from 'lucide-react';

// ✅ ResultCard EST DEHORS de App, sans export default
function ResultCard({ result }) {
  return (
    <div className="bg-gray-800/80 border border-gray-700/50 rounded-2xl p-5 max-w-[85%]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full border-2 border-blue-500/40 flex flex-col items-center justify-center">
          <span className="text-lg font-medium text-white">{result.score}</span>
          <span className="text-[9px] text-gray-400">/ 10</span>
        </div>
        <div>
          <p className="text-white font-medium">Startup Evaluation</p>
          <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full">
            {result.verdict}
          </span>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-4 pb-4 border-b border-gray-700">
        {result.summary}
      </p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Market", value: result.market_size },
          { label: "Competition", value: result.competition_level },
          { label: "Monetization", value: `${result.monetization_potential}/10` },
        ].map((m) => (
          <div key={m.label} className="bg-gray-900 rounded-xl p-3 border border-gray-700">
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">{m.label}</p>
            <p className="text-sm font-medium text-white mt-1">{m.value}</p>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Key Risks</p>
        {result.key_risks.map((risk, i) => (
          <div key={i} className="flex gap-2 text-sm text-gray-300 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            {risk}
          </div>
        ))}
      </div>
      <div>
        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Recommendations</p>
        {result.recommendations.map((rec, i) => (
          <div key={i} className="flex gap-2 text-sm text-gray-300 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
            {rec}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'ai', 
      text: "Hi there! I'm your AI startup co-founder. What's the big idea you are working on today?" 
    }
  ]);
  
  const [input, setInput] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const ideaToEvaluate = input;
    setInput('');

    const userMessage = { id: Date.now(), role: 'user', text: ideaToEvaluate };
    setMessages((prev) => [...prev, userMessage]);

    const typingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev, 
      { id: typingId, role: 'ai', text: "Analyzing your idea..." }
    ]);

    try {
      const response = await fetch("https://aurateam.app.n8n.cloud/webhook/evaluate-startup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: ideaToEvaluate }), 
      });

      // Check if the server returned an error (e.g., 404, 500)
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      // Read the response as raw text first
      const textResponse = await response.text();
      
      // Prevent the JSON crash if the text is empty
      if (!textResponse) {
        throw new Error("The webhook returned an empty response instead of JSON.");
      }

      // Safely parse the text into JSON
      const data = JSON.parse(textResponse);
      const result = Array.isArray(data) ? data[0] : data;

      setMessages((prev) =>
        prev.map(msg =>
          msg.id === typingId ? { ...msg, text: null, result: result } : msg
        )
      );

    } catch (error) {
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === typingId ? { ...msg, text: `Error: ${error.message}` } : msg
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500/30">
      
      <header className="flex items-center gap-3 p-5 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide text-white">IdeaValidator AI</h1>
          <p className="text-xs text-gray-400">Prototype Phase</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-6 pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.role === 'ai' && (
                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20 mt-1">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
              )}
              
              <div 
                className={`p-4 max-w-[85%] md:max-w-[75%] rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-gray-800/80 border border-gray-700/50 rounded-tl-sm text-gray-200'
                }`}
              >
                {msg.result ? (
                  <ResultCard result={msg.result} />
                ) : (
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700 mt-1">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="p-4 md:p-6 border-t border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your startup idea here..."
              className="flex-1 bg-gray-950 border border-gray-700 text-white rounded-2xl pl-5 pr-16 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-500 shadow-inner"
              autoComplete="off"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all flex items-center justify-center shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <div className="text-center mt-3 text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400/70" />
            <span>AI logic is simulated. Ready for backend integration.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// ✅ Un seul export default à la fin
export default App;