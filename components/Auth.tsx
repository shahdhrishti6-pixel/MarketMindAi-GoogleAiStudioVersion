
import React, { useState } from 'react';
import { Cpu, Mail, Lock, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

interface AuthProps {
  onSignIn: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSignIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignIn();
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 grid-pattern opacity-40"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00A8E8]/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0084FF]/5 rounded-full blur-[100px]"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-black/5 p-10 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="p-4 bg-black rounded-2xl mb-6 shadow-xl shadow-black/10">
              <Cpu className="w-8 h-8 text-[#00A8E8]" />
            </div>
            <h1 className="text-3xl font-black text-black tracking-tight mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-400 font-medium">
              Access your digital marketing headquarters
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
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00A8E8] rounded-2xl outline-none transition-all font-medium text-black placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Password</label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-bold text-[#0084FF] hover:underline uppercase tracking-widest">Forgot?</button>
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
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00A8E8] rounded-2xl outline-none transition-all font-medium text-black placeholder:text-gray-300"
                />
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-5 bg-black text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-800 transition-all transform active:scale-[0.98] shadow-lg shadow-black/10"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In to Dashboard' : 'Create My Account'}
                  <ArrowRight className="w-5 h-5 text-[#00A8E8]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-500 font-medium">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#0084FF] font-black hover:underline ml-1"
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
          <Sparkles className="w-3 h-3" />
          Powered by MarketMind Intelligence
        </div>
      </div>
    </div>
  );
};

export default Auth;
