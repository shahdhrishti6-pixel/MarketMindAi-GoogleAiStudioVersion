
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Info, TrendingUp, Zap, Users, MousePointer2, DollarSign } from 'lucide-react';
import { InsightMetric } from '../types';

const insights: InsightMetric[] = [
  {
    name: 'CTR',
    fullName: 'Click-Through Rate',
    description: 'The percentage of people who clicked your ad after seeing it. High CTR indicates strong creative and relevance.',
    value: '3.4%',
    trend: '+12%',
    visualData: [10, 15, 12, 18, 25, 22, 30]
  },
  {
    name: 'ROAS',
    fullName: 'Return on Ad Spend',
    description: 'Total revenue generated per dollar spent on advertising. The holy grail of e-commerce performance.',
    value: '4.8x',
    trend: '+5%',
    visualData: [2, 3, 2.5, 4, 3.8, 5, 4.8]
  },
  {
    name: 'CPC',
    fullName: 'Cost Per Click',
    description: 'How much you pay on average for each click. Lower is usually better, but quality of traffic matters more.',
    value: '$0.84',
    trend: '-2%',
    visualData: [1.2, 1.1, 1.0, 0.9, 0.85, 0.82, 0.84]
  },
  {
    name: 'CPA',
    fullName: 'Cost Per Acquisition',
    description: 'The cost to acquire one paying customer. Vital for understanding your unit economics and scale.',
    value: '$24.50',
    trend: '-8%',
    visualData: [35, 32, 28, 30, 26, 25, 24.5]
  }
];

const Insights: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-black mb-4">Marketing Insights</h2>
          <p className="text-gray-500 max-w-2xl">Master the metrics that move the needle. Data-driven marketing explained simply.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {insights.map((metric) => (
            <div key={metric.name} className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-black text-black">{metric.name}</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded">
                      {metric.trend}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{metric.fullName}</h4>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#0084FF]">{metric.value}</div>
                </div>
              </div>

              <div className="h-40 w-full mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metric.visualData.map((v, i) => ({ val: v, time: i }))}>
                    <defs>
                      <linearGradient id={`grad-${metric.name}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00A8E8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00A8E8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="val" 
                      stroke="#00A8E8" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill={`url(#grad-${metric.name})`} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm flex gap-3 italic">
                <Info className="w-5 h-5 text-[#00A8E8] shrink-0" />
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Glossary/Concepts */}
        <div className="bg-black text-white p-12 md:p-20 rounded-[4rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A8E8]/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-12">Core Marketing Concepts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="p-3 bg-white/10 rounded-2xl w-fit">
                  <TrendingUp className="w-6 h-6 text-[#00A8E8]" />
                </div>
                <h4 className="text-xl font-bold">Sales Funnel</h4>
                <p className="text-gray-400 text-sm leading-relaxed">The journey from awareness to purchase. Tofu (Top), Mofu (Middle), Bofu (Bottom).</p>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-white/10 rounded-2xl w-fit">
                  <Zap className="w-6 h-6 text-[#0084FF]" />
                </div>
                <h4 className="text-xl font-bold">Performance Ads</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Direct-response advertising designed to drive specific actions (sales, signups).</p>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-white/10 rounded-2xl w-fit">
                  <Users className="w-6 h-6 text-[#00A8E8]" />
                </div>
                <h4 className="text-xl font-bold">LTV (Life Time Value)</h4>
                <p className="text-gray-400 text-sm leading-relaxed">The total worth to a business of a customer over the whole period of their relationship.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
