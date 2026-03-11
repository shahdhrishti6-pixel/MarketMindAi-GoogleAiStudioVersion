
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Templates from './components/Templates';
import Insights from './components/Insights';
import AICenter from './components/AICenter';
import CreativeStudio from './components/CreativeStudio';
import VideoLab from './components/VideoLab';
import LiveConsultant from './components/LiveConsultant';
import Assistant from './components/Assistant';
import GlobalAssistant from './components/GlobalAssistant';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { auth, onAuthStateChanged, signOut } from './firebase';

export type Page = 'home' | 'tools' | 'templates' | 'insights' | 'ai-center' | 'creative-studio' | 'video-lab' | 'live-consultant' | 'assistant' | 'about' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentPage('home');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Dashboard onNavigate={setCurrentPage} />
          </>
        );
      case 'tools':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'templates':
        return <Templates />;
      case 'insights':
        return <Insights />;
      case 'ai-center':
        return <AICenter />;
      case 'creative-studio':
        return <CreativeStudio />;
      case 'video-lab':
        return <VideoLab />;
      case 'live-consultant':
        return <LiveConsultant />;
      case 'assistant':
        return <Assistant />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
        <div className="w-12 h-12 border-4 border-violet-100 border-t-[#8B5CF6] rounded-full animate-spin"></div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
          Initializing MarketMind AI...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#8B5CF6] selection:text-white">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} />
      <main className="flex-grow pt-20">
        {renderPage()}
      </main>
      <GlobalAssistant />
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
