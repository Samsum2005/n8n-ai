import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  Image as ImageIcon, 
  FileText, 
  Send, 
  Calendar, 
  Type, 
  LayoutTemplate,
  Video,
  Sparkles,
  MessageSquare,
  Link as LinkIcon,
  Eye,
  Rocket,
  Users
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

export default function AutomateClubDashboard() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [driveLink, setDriveLink] = useState('');
  
  // State for creative controls
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Instagram', 'LinkedIn']);
  const [selectedFormats, setSelectedFormats] = useState(['Story', 'Standard Post']);
  const [selectedTone, setSelectedTone] = useState('Energetic & Fun');
  
  // State for the publishing mode (draft vs auto-publish)
  const [publishMode, setPublishMode] = useState('draft'); // 'draft' | 'auto'

  const platforms = [
    { name: 'Instagram', icon: <InstaIcon className="w-4 h-4 mr-2" />, activeClass: 'bg-pink-500/10 border-pink-500/50 text-pink-400' },
    { name: 'LinkedIn', icon: <LinkedInIcon className="w-4 h-4 mr-2" />, activeClass: 'bg-blue-500/10 border-blue-500/50 text-blue-400' },
    { name: 'Twitter / X', icon: <TwitterIcon className="w-4 h-4 mr-2" />, activeClass: 'bg-slate-700 border-slate-500 text-slate-200' },
    { name: 'Club Blog', icon: <LayoutTemplate className="w-4 h-4 mr-2" />, activeClass: 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' }
  ];

  const formats = [
    { name: 'Story', icon: <ImageIcon className="w-4 h-4 mr-2" /> },
    { name: 'Standard Post', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
    { name: 'Carousel (Multi-image)', icon: <LayoutTemplate className="w-4 h-4 mr-2" /> },
    { name: 'Reel/TikTok Script', icon: <Video className="w-4 h-4 mr-2" /> }
  ];

  const tones = ['Professional', 'Energetic & Fun', 'Academic & Serious', 'Hype/Urgent'];

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const toggleArrayItem = (item, array, setArray) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const N8N_URL = "https://aurateam.app.n8n.cloud/webhook/VOTRE-PATH-ICI";

  const handleSubmit = async () => {
    try {
      const response = await fetch(N8N_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Toutes les données du formulaire
          platforms: selectedPlatforms,
          formats: selectedFormats,
          tone: selectedTone,
          publishMode: publishMode,
          driveLink: driveLink,
        }),
      });

      const data = await response.json();
      console.log("n8n response:", data);
      // Ici vous pouvez afficher le résultat

    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 font-sans text-slate-300">
      <div className="w-full mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Event Content <span className="text-blue-500 drop-shadow-md">Automator</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Upload your raw event photos and notes. Tailor your platforms and tone, and let AI do the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800/60 overflow-hidden p-8 space-y-8">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3">1. Event Details</h2>
            
            <div className="space-y-6">
              
              {/* Row 1: Club Name & Event Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-slate-300">
                    <Users className="w-4 h-4 mr-2 text-blue-500" /> Club Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., School of AI Bejaia" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-slate-950/50 text-white placeholder-slate-500 transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-slate-300">
                    <Type className="w-4 h-4 mr-2 text-blue-500" /> Event Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., Automate & Innovate Hackathon" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-slate-950/50 text-white placeholder-slate-500 transition-all" 
                  />
                </div>
              </div>
              
              {/* Row 2: Event Dates (Start & End) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-slate-300">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" /> Start Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-slate-950/50 text-white transition-all style-color-scheme-dark" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-slate-300">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" /> End Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-slate-950/50 text-white transition-all style-color-scheme-dark" 
                  />
                </div>
              </div>
            </div>

            {/* Event Notes */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-300">
                <FileText className="w-4 h-4 mr-2 text-blue-500" /> Event Notes & Highlights
              </label>
              <textarea 
                rows="3" 
                placeholder="Highlights, guest speakers, winning teams, funny moments..." 
                className="w-full px-4 py-3 rounded-xl border border-slate-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-slate-950/50 text-white placeholder-slate-500 resize-none transition-all"
              ></textarea>
            </div>

            {/* Media Upload */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-slate-300">
                <ImageIcon className="w-4 h-4 mr-2 text-blue-500" /> Raw Photos or Media
              </label>
              
              <div 
                className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${
                  dragActive ? 'border-blue-500 bg-blue-900/20' : 'border-slate-700 bg-slate-950/50 hover:bg-slate-800/50'
                }`}
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              >
                <UploadCloud className={`w-10 h-10 mb-2 ${dragActive ? 'text-blue-400' : 'text-slate-500'}`} />
                <p className="text-slate-400 font-medium text-sm">Drag and drop photos here</p>
                <input type="file" multiple accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => { if (e.target.files) setFiles([...files, ...Array.from(e.target.files)]) }} />
              </div>
              
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {files.map((file, idx) => (
                    <div key={idx} className="bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-xs font-medium text-slate-300 shadow-sm">
                      {file.name.length > 15 ? file.name.substring(0, 15) + '...' : file.name}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-3 py-3">
                <div className="flex-grow h-px bg-slate-800"></div>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">OR</span>
                <div className="flex-grow h-px bg-slate-800"></div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-slate-500" />
                </div>
                <input 
                  type="url" 
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  placeholder="Paste Google Drive folder link..." 
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-slate-950/50 text-white placeholder-slate-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Creative Control */}
          <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-800/60 overflow-hidden p-8 space-y-8 flex flex-col">
            <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" /> Creative Strategy
            </h2>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300">Select Platforms</label>
              <div className="flex flex-col gap-2">
                {platforms.map(platform => (
                  <button 
                    key={platform.name}
                    onClick={() => toggleArrayItem(platform.name, selectedPlatforms, setSelectedPlatforms)}
                    className={`flex items-center px-4 py-2.5 rounded-xl border transition-all text-left ${
                      selectedPlatforms.includes(platform.name) 
                      ? `${platform.activeClass} font-medium` 
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {platform.icon} {platform.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300">Format Types</label>
              <div className="flex flex-wrap gap-2">
                {formats.map(format => (
                  <button 
                    key={format.name}
                    onClick={() => toggleArrayItem(format.name, selectedFormats, setSelectedFormats)}
                    className={`flex items-center px-3 py-1.5 text-sm rounded-full border transition-all ${
                      selectedFormats.includes(format.name) 
                      ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' 
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {format.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300">Content Tone</label>
              <select 
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-700/50 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-slate-950/50 text-white font-medium transition-all appearance-none"
              >
                {tones.map(tone => (
                  <option key={tone} value={tone} className="bg-slate-900 text-white py-2">{tone}</option>
                ))}
              </select>
            </div>

            <div className="flex-grow"></div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300">Publishing Action</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPublishMode('draft')}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all ${
                    publishMode === 'draft' 
                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' 
                    : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                  }`}
                >
                  <Eye className="w-5 h-5 mb-1" />
                  <span className="text-xs font-semibold">Review Drafts</span>
                </button>
                <button 
                  onClick={() => setPublishMode('auto')}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all ${
                    publishMode === 'auto' 
                    ? 'bg-orange-500/10 border-orange-500/50 text-orange-400' 
                    : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                  }`}
                >
                  <Rocket className="w-5 h-5 mb-1" />
                  <span className="text-xs font-semibold">Auto-Publish</span>
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                handleSubmit(); 
                navigate('/draft');
              }}
              className={`w-full flex items-center justify-center px-6 py-4 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 border ${
                publishMode === 'draft' 
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20 border-blue-500/50' 
                : 'bg-orange-600 hover:bg-orange-500 shadow-orange-900/20 border-orange-500/50'
              }`}
            >
              {publishMode === 'draft' ? (
                <>
                  <Eye className="w-5 h-5 mr-2" /> Generate Drafts
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5 mr-2" /> Automate Post
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}