import { useState } from 'react';
import { Send, Bot, User, Sparkles, Lightbulb } from 'lucide-react';

function App() {
  // State to hold our chat messages
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'ai', 
      text: "Hi there! I'm your AI startup co-founder. What's the big idea you are working on today?" 
    }
  ]);
  
  // State for the text input field
  const [input, setInput] = useState('');

  // Function to handle sending a new message (Notice it is now 'async')
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Save the input to send to the API, then clear the box instantly
    const ideaToEvaluate = input;
    setInput('');

    // 1. Add the user's message to the chat
    const userMessage = { id: Date.now(), role: 'user', text: ideaToEvaluate };
    setMessages((prev) => [...prev, userMessage]);

    // 2. Add a temporary "Analyzing..." message so the user knows the AI is thinking
    const typingId = Date.now() + 1;
    setMessages((prev) => [
      ...prev, 
      { id: typingId, role: 'ai', text: "Analyzing your idea..." }
    ]);

    try {
      // 3. Send the idea to n8n
      // (We will replace this URL with your actual n8n webhook URL later)
      const response = await fetch("YOUR_N8N_WEBHOOK_URL_HERE", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // We pack the idea into a JSON object to send to the backend
        body: JSON.stringify({ idea: ideaToEvaluate }), 
      });

      // 4. Wait for n8n to process the AI and send the data back
      const data = await response.json();

      // 5. Replace the "Analyzing..." message with the REAL AI response
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === typingId ? { ...msg, text: data.reply } : msg
        )
      );

    } catch (error) {
      // If the server is offline, errors out, or the webhook isn't set up yet
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === typingId ? { ...msg, text: "Oops! The AI backend is currently offline. (Webhook not connected yet!)" } : msg
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500/30">
      
      {/* --- HEADER --- */}
      <header className="flex items-center gap-3 p-5 border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wide text-white">IdeaValidator AI</h1>
          <p className="text-xs text-gray-400">Prototype Phase</p>
        </div>
      </header>

      {/* --- CHAT AREA --- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-6 pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* AI Avatar */}
              {msg.role === 'ai' && (
                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-500/20 mt-1">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
              )}
              
              {/* Message Bubble */}
              <div 
                className={`p-4 max-w-[85%] md:max-w-[75%] rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-gray-800/80 border border-gray-700/50 rounded-tl-sm text-gray-200'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700 mt-1">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* --- INPUT AREA --- */}
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

export default App;