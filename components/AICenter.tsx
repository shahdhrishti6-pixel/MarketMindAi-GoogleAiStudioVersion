
import React, { useState } from 'react';
import { Send, Sparkles, Loader2, RefreshCw, Layers, Megaphone, Lightbulb, PenTool } from 'lucide-react';
import { generateMarketingContent } from '../services/gemini';

const promptTemplates = [
  { id: 'ad', title: 'Ad Copy Generator', icon: <Megaphone />, placeholder: 'e.g., Luxury watch brand for Gen Z', prompt: 'Create 3 variations of Facebook ad copy for: ' },
  { id: 'ideas', title: '10 Content Ideas', icon: <Lightbulb />, placeholder: 'e.g., Fitness coaching for busy parents', prompt: 'Generate 10 trending content ideas for the niche: ' },
  { id: 'script', title: 'Short-form Reel Script', icon: <PenTool />, placeholder: 'e.g., Sustainable skincare launch', prompt: 'Write a high-energy 60-second video script for: ' },
  { id: 'strategy', title: 'Launch Strategy', icon: <Layers />, placeholder: 'e.g., New SaaS productivity tool', prompt: 'Develop a 4-week launch strategy for: ' },
];

const AICenter: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState(promptTemplates[0]);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    setResult('');
    
    const fullPrompt = `${activeTemplate.prompt} ${inputValue}`;
    const output = await generateMarketingContent(fullPrompt);
    
    setResult(output);
    setLoading(false);
  };

  return (
    <section className="bg-white py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex p-3 bg-blue-50 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-[#00A8E8]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">AI Command Center</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Your portal to infinite marketing creativity. Select a blueprint and let the AI build your campaign.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar - Templates */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Execution Blueprints</h3>
            {promptTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => {
                  setActiveTemplate(template);
                  setInputValue('');
                }}
                className={`w-full flex items-center gap-4 p-5 rounded-3xl text-left transition-all border ${
                  activeTemplate.id === template.id 
                  ? 'bg-black text-white border-black shadow-xl shadow-black/10' 
                  : 'bg-white text-gray-600 border-gray-100 hover:border-[#00A8E8]/30 hover:bg-gray-50'
                }`}
              >
                <div className={`p-3 rounded-xl ${activeTemplate.id === template.id ? 'bg-[#00A8E8]/20 text-[#00A8E8]' : 'bg-gray-100'}`}>
                  {React.cloneElement(template.icon as React.ReactElement, { className: 'w-5 h-5' })}
                </div>
                <span className="font-bold">{template.title}</span>
              </button>
            ))}
          </div>

          {/* Main - Interaction */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-[#F4F4F4] p-8 rounded-[3rem] shadow-inner relative">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Enter Brand / Niche / Details</label>
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={activeTemplate.placeholder}
                className="w-full bg-transparent border-none text-xl md:text-2xl font-medium text-black placeholder:text-gray-300 focus:ring-0 resize-none h-32 md:h-40"
              />
              <div className="flex justify-end mt-4">
                <button 
                  onClick={handleGenerate}
                  disabled={loading || !inputValue}
                  className="flex items-center gap-2 px-8 py-4 bg-[#0084FF] text-white rounded-2xl font-bold hover:bg-[#0073e6] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#0084FF]/20"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? 'Thinking...' : 'Generate Powerfully'}
                </button>
              </div>
            </div>

            {/* Results Area */}
            {result && (
              <div className="bg-white border-2 border-gray-100 rounded-[3rem] p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                  <h4 className="text-xl font-black flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#00A8E8]" />
                    AI Intelligence Output
                  </h4>
                  <button onClick={() => setResult('')} className="text-gray-400 hover:text-black transition-colors">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {result}
                </div>
                <div className="mt-10 flex gap-4">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(result);
                      alert('Copied to clipboard!');
                    }}
                    className="flex-grow py-4 border-2 border-gray-100 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                  >
                    Copy Strategy
                  </button>
                  <button className="flex-grow py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all">
                    Export to PDF
                  </button>
                </div>
              </div>
            )}
            
            {!result && !loading && (
              <div className="border-2 border-dashed border-gray-100 rounded-[3rem] p-20 flex flex-col items-center justify-center text-center opacity-40">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-gray-300" />
                </div>
                <p className="font-bold text-gray-400">Your AI-generated marketing brilliance will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICenter;
