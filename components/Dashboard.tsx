
import React, { useState } from 'react';
import { 
  Type, Video, Camera, BarChart3, Calendar, 
  Target, Mail, Hash, ChevronRight, Wand2, X, Loader2, Sparkles, Copy, Check
} from 'lucide-react';
import { MarketingTool } from '../types';
import { generateMarketingContent } from '../services/gemini';

const tools: MarketingTool[] = [
  {
    id: 'caption',
    title: 'AI Caption Generator',
    description: 'Hooks, CTAs, long captions, and ad copy tailored for high engagement.',
    icon: <Type className="w-6 h-6 text-[#00A8E8]" />,
    category: 'Copy'
  },
  {
    id: 'reel',
    title: 'Reel Script Generator',
    description: 'Short-form scripts based on platform and objective with pacing cues.',
    icon: <Video className="w-6 h-6 text-[#0084FF]" />,
    category: 'Video'
  },
  {
    id: 'adfix',
    title: 'Fix My Ad Tool',
    description: 'Improve headlines, copy, creative suggestions and CTA options instantly.',
    icon: <Camera className="w-6 h-6 text-[#00A8E8]" />,
    category: 'Ads'
  },
  {
    id: '6m',
    title: "6M's Campaign Builder",
    description: 'Generate Market, Mission, Message, Media, Money, and Measurement.',
    icon: <BarChart3 className="w-6 h-6 text-[#0084FF]" />,
    category: 'Strategy'
  },
  {
    id: 'calendar',
    title: '30-Day Content Calendar',
    description: 'A full month of strategic content mapped out for your brand niche.',
    icon: <Calendar className="w-6 h-6 text-[#00A8E8]" />,
    category: 'Management'
  },
  {
    id: 'stp',
    title: 'Brand Positioning Tool',
    description: 'Define your Segmentation, Targeting, and Positioning (STP Framework).',
    icon: <Target className="w-6 h-6 text-[#0084FF]" />,
    category: 'Strategy'
  },
  {
    id: 'outreach',
    title: 'Influencer Outreach Maker',
    description: 'Personalized templates that convert for creators and brand collabs.',
    icon: <Mail className="w-6 h-6 text-[#00A8E8]" />,
    category: 'Relations'
  },
  {
    id: 'hashtags',
    title: 'Hashtag Grouping Tool',
    description: 'Smart categorizing of high-reach hashtags for your specific content.',
    icon: <Hash className="w-6 h-6 text-[#0084FF]" />,
    category: 'Social'
  }
];

const Dashboard: React.FC = () => {
  const [activeTool, setActiveTool] = useState<MarketingTool | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleLaunch = (tool: MarketingTool) => {
    setActiveTool(tool);
    setResult('');
    setInputValue('');
  };

  const handleRunTool = async () => {
    if (!inputValue || !activeTool) return;
    setIsLoading(true);
    
    let promptPrefix = "";
    switch(activeTool.id) {
      case 'caption': promptPrefix = "Generate high-engaging social media captions, hooks, and CTAs for: "; break;
      case 'reel': promptPrefix = "Write a 60-second short-form video script with visual cues and pacing for: "; break;
      case 'adfix': promptPrefix = "Critique this ad copy and provide 3 significantly improved versions with better headlines and CTAs: "; break;
      case '6m': promptPrefix = "Create a comprehensive marketing plan using the 6Ms framework (Market, Mission, Message, Media, Money, Measurement) for: "; break;
      case 'calendar': promptPrefix = "Generate a detailed 30-day marketing content calendar in a list format for: "; break;
      case 'stp': promptPrefix = "Perform an STP (Segmentation, Targeting, Positioning) analysis for this brand: "; break;
      case 'outreach': promptPrefix = "Write a professional and personalized influencer outreach email for: "; break;
      case 'hashtags': promptPrefix = "Research and group 30 high-performing hashtags into categories (Niche, Growth, Broad) for: "; break;
      default: promptPrefix = "Analyze and provide professional marketing advice for: ";
    }

    const output = await generateMarketingContent(`${promptPrefix} ${inputValue}`);
    setResult(output);
    setIsLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section className="bg-[#F4F4F4] py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black text-black mb-2">Marketing Tools Dashboard</h2>
            <p className="text-gray-500">Powerful AI tools to automate your marketing workflow.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => handleLaunch(tool)}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-[#00A8E8]/30 transition-all group hover:shadow-2xl hover:shadow-[#00A8E8]/5 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Wand2 className="w-4 h-4 text-[#00A8E8]" />
              </div>
              <div className="bg-gray-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#0084FF] transition-colors">
                {tool.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {tool.description}
              </p>
              <button className="flex items-center gap-1 text-sm font-bold text-black group-hover:gap-2 transition-all">
                Launch Tool
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-2xl">
                  {activeTool.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black">{activeTool.title}</h3>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">{activeTool.category} Tool</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTool(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto space-y-8">
              {!result && !isLoading ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Brand Details / Objective / Prompt</label>
                    <textarea 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter specific details about your brand or the content you need..."
                      className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00A8E8] rounded-3xl p-6 text-lg min-h-[150px] outline-none transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <button 
                    onClick={handleRunTool}
                    disabled={!inputValue}
                    className="w-full py-5 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 disabled:opacity-50 transition-all transform active:scale-95"
                  >
                    Generate AI Insight
                    <Sparkles className="w-5 h-5 text-[#00A8E8]" />
                  </button>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-[#00A8E8] animate-spin" />
                    <Sparkles className="w-6 h-6 text-[#0084FF] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">MarketMind AI is processing...</h4>
                    <p className="text-gray-400">Synthesizing professional marketing strategies.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center bg-blue-50 p-4 rounded-2xl border border-blue-100">
                    <span className="text-sm font-bold text-[#0084FF] flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generated with Intelligence
                    </span>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-all"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {isCopied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed font-medium pb-10">
                    {result}
                  </div>
                </div>
              )}
            </div>

            {result && !isLoading && (
              <div className="p-8 border-t border-gray-100 bg-gray-50 flex gap-4">
                <button 
                  onClick={() => setResult('')}
                  className="flex-grow py-4 border-2 border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-100 transition-all"
                >
                  Regenerate
                </button>
                <button 
                  onClick={() => setActiveTool(null)}
                  className="flex-grow py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
