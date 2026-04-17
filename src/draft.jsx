import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle2, 
  RefreshCw, 
  Send, 
  Image as ImageIcon,
  LayoutTemplate,
  Download
} from 'lucide-react';

// --- CUSTOM SVG BRAND ICONS ---
const InstaIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);
// ------------------------------

export default function DraftResultsView({ onBack }) {
  const [copiedStates, setCopiedStates] = useState({});

  // Mock data now includes 'imageUrl' for the selected/generated media
  const [drafts, setDrafts] = useState([
    {
      id: 'linkedin',
      platform: 'LinkedIn',
      icon: <LinkedInIcon className="w-5 h-5 text-blue-400" />,
      color: 'blue',
      content: "We are thrilled to announce the successful conclusion of the Automate & Innovate Hackathon hosted by the School of AI Bejaia! 🚀\n\nOver the weekend, brilliant minds gathered to build the future. A special thank you to our guest speakers and to every participant who brought their A-game.\n\nSwipe through to see the winning projects! 👇\n\n#AI #Innovation #Hackathon #SchoolOfAI #TechLeadership",
      mediaCount: 4,
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Mock event photo
    },
    {
      id: 'instagram',
      platform: 'Instagram Story',
      icon: <InstaIcon className="w-5 h-5 text-pink-400" />,
      color: 'pink',
      content: "🔥 What an incredible weekend at the Automate & Innovate Hackathon! \n\nMassive shoutout to everyone who pulled an all-nighter to finish their projects. The energy was UNMATCHED. ⚡️\n\nDrop a 🚀 in the comments if you were there!\n\n@SchoolOfAI_Bejaia",
      mediaCount: 1,
      imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Mock vertical/story vibe photo
    },
    {
      id: 'twitter',
      platform: 'Twitter / X',
      icon: <TwitterIcon className="w-5 h-5 text-slate-200" />,
      color: 'slate',
      content: "Just wrapped up the Automate & Innovate Hackathon! 💻✨ Huge congrats to the winning teams. The future of AI in Algeria is looking brighter than ever. Thread below on the top 3 projects! 👇🧵 #SchoolOfAI #BejaiaTech",
      mediaCount: 1,
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Mock laptop/coding photo
    }
  ]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [id]: false });
    }, 2000);
  };

  const handleContentChange = (id, newContent) => {
    setDrafts(drafts.map(draft => draft.id === id ? { ...draft, content: newContent } : draft));
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-300">
      <div className="w-full mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center text-slate-400 hover:text-white transition-colors mb-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Editor
            </button>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Review Generated <span className="text-blue-500">Drafts</span>
            </h1>
            <p className="text-slate-400 mt-1">
              Review and edit your AI-generated text and media before publishing.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition-all border border-slate-700">
              <RefreshCw className="w-4 h-4 mr-2 text-blue-400" />
              Regenerate All
            </button>
            <button className="flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 transition-all border border-blue-500/50">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve All
            </button>
          </div>
        </div>

        {/* Drafts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {drafts.map((draft) => (
            <div key={draft.id} className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800/60 overflow-hidden flex flex-col">
              
              {/* Card Header */}
              <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-${draft.color}-500/10 border border-${draft.color}-500/20`}>
                    {draft.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{draft.platform}</h3>
                </div>
                <div className="flex items-center text-xs font-medium text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                  <ImageIcon className="w-3.5 h-3.5 mr-1.5" />
                  {draft.mediaCount} Media Attached
                </div>
              </div>

              {/* MEDIA PREVIEW SECTION */}
              {draft.imageUrl && (
                <div className="px-6 pt-6">
                  <div className="relative group rounded-xl overflow-hidden border border-slate-700/50 h-48 bg-slate-800">
                    <img 
                      src={draft.imageUrl} 
                      alt={`Generated media for ${draft.platform}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                      <button className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-600 flex items-center">
                        <ImageIcon className="w-4 h-4 mr-2 text-blue-400" /> Change Media
                      </button>
                      <button className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors border border-slate-600">
                        <Download className="w-4 h-4 text-slate-300" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Editable Text Area */}
              <div className="p-6 flex-grow">
                <textarea 
                  value={draft.content}
                  onChange={(e) => handleContentChange(draft.id, e.target.value)}
                  className="w-full h-full min-h-[160px] bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y leading-relaxed transition-all"
                />
              </div>

              {/* Action Footer */}
              <div className="px-6 py-4 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center">
                <button 
                  onClick={() => handleCopy(draft.id, draft.content)}
                  className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  {copiedStates[draft.id] ? (
                    <><CheckCircle2 className="w-4 h-4 mr-2 text-green-400" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4 mr-2" /> Copy Caption</>
                  )}
                </button>
                
                <button className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-all border border-slate-700">
                  <Send className="w-4 h-4 mr-2 text-blue-400" />
                  Publish Now
                </button>
              </div>
            </div>
          ))}

          {/* Render the Blog Post Card differently (spans full width, no specific image preview required here as blogs mix images and text) */}
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl shadow-xl border border-slate-800/60 overflow-hidden flex flex-col">
             <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20`}>
                    <LayoutTemplate className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Club Blog Post</h3>
                </div>
              </div>
              <div className="p-6">
                 <textarea 
                  defaultValue={"# Automate & Innovate: A Weekend of Brilliance\n\nThis past weekend, the School of AI Bejaia transformed into a hub of non-stop coding, problem-solving, and innovation. Over 100 students gathered to tackle real-world problems...\n\n## Key Highlights\n- 15 Teams competed\n- 4 Guest Speakers from top tech firms\n- 24 hours of coding\n\nWe cannot wait to see what these teams build next. Stay tuned!"}
                  className="w-full min-h-[250px] bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-y leading-relaxed transition-all"
                />
              </div>
              <div className="px-6 py-4 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center">
                <button className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
                  <Copy className="w-4 h-4 mr-2" /> Copy Markdown
                </button>
                <button className="flex items-center px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-all border border-slate-700">
                  <Send className="w-4 h-4 mr-2 text-emerald-400" />
                  Export to Website
                </button>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}