
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

export type Page = 'home' | 'tools' | 'templates' | 'insights' | 'ai-center' | 'creative-studio' | 'video-lab' | 'live-consultant' | 'assistant' | 'about' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if already "logged in" for the session
  useEffect(() => {
    const authStatus = localStorage.getItem('marketmind_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
    localStorage.setItem('marketmind_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('marketmind_auth');
    setCurrentPage('home');
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

  if (!isAuthenticated) {
    return <Auth onSignIn={handleSignIn} />;
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
