
import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import Logo from './Logo';
import { logUserSignIn } from '../services/automation';

interface AuthProps {
  onSignIn: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSignIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Simulate Auth Delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    // 2. Trigger Free Google Sheet Automation
    // Logs the event for both login and account creation
    if (email) {
      logUserSignIn(email);
    }

    // 3. Complete sign-in
    setIsLoading(false);
    onSignIn();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center brand-gradient relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-2xl shadow-black/20 p-10 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="p-6 bg-[#4B0082] rounded-[2rem] mb-6 shadow-2xl shadow-indigo-900/40 ring-4 ring-white/10">
              <Logo size={56} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-[#2D004B] tracking-tight mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">
              Market Mind Ai
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#4B0082] rounded-2xl outline-none transition-all font-medium text-black placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-bold text-[#7C3AED] hover:underline uppercase tracking-widest">Forgot?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#4B0082] rounded-2xl outline-none transition-all font-medium text-black placeholder:text-gray-300"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-5 bg-[#4B0082] text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#2D004B] transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-900/20"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Get Started'}
                  <ArrowRight className="w-5 h-5 text-violet-300" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              {isLogin ? "New to MarketMind?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#4B0082] font-black hover:underline ml-1"
              >
                {isLogin ? 'Join now' : 'Log in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
          <span className="opacity-50">Free Automation Active</span>
          <Sparkles className="w-3 h-3 text-violet-400" />
          Powered by Market Mind Ai
        </div>
      </div>
    </div>
  );
};

export default Auth;
