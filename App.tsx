import React, { useState } from 'react';
import { Onboarding } from './pages/Onboarding';
import { Feed } from './pages/Feed';
import { Profile } from './pages/Profile';
import { VoiceRoom } from './components/VoiceRoom';
import { GeminiChat } from './components/GeminiChat';
import { User, PageView, VoiceRoom as VoiceRoomType } from './types';
import { NAV_ITEMS } from './constants';

const App: React.FC = () => {
  const [page, setPage] = useState<PageView>(PageView.SPLASH);
  const [user, setUser] = useState<User | null>(null);
  const [activeRoom, setActiveRoom] = useState<VoiceRoomType | null>(null);

  const handleOnboardingComplete = (partialProfile: Partial<User>) => {
    setUser({
      id: 'current_user',
      nickname: partialProfile.nickname || 'User',
      avatarEmoji: '🐼',
      synergyScore: 0,
      vibe: 'Deep',
      interests: partialProfile.interests || [],
    });
    setPage(PageView.FEED);
  };

  const handleNavClick = (id: string) => {
    if (id === 'feed') setPage(PageView.FEED);
    if (id === 'profile') setPage(PageView.PROFILE);
    // Other navs placeholder
  };

  const handleJoinRoom = (room: VoiceRoomType) => {
    setActiveRoom(room);
  };

  // If no user, show onboarding flow (which handles splash internally)
  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-violet-500/30 relative">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-900/80 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
            {activeRoom ? 'Active Call' : (page === PageView.FEED ? 'ShyPy' : 'Profile')}
        </h1>
        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-sm border border-violet-500/30">
          {user.synergyScore}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto min-h-screen">
        {page === PageView.FEED && <Feed onJoinRoom={handleJoinRoom} />}
        {page === PageView.PROFILE && <Profile user={user} />}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/90 backdrop-blur-lg border-t border-white/5 pb-safe">
        <div className="flex justify-around items-center p-2 max-w-md mx-auto">
          {NAV_ITEMS.map(item => {
             const Icon = item.icon;
             const isActive = (page === PageView.FEED && item.id === 'feed') || (page === PageView.PROFILE && item.id === 'profile');
             return (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                      isActive ? 'text-violet-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium mt-1">{item.label}</span>
                </button>
             )
          })}
        </div>
      </nav>

      {/* Overlays */}
      {activeRoom && (
        <VoiceRoom room={activeRoom} onLeave={() => setActiveRoom(null)} />
      )}

      {/* AI Chat Assistant */}
      {!activeRoom && <GeminiChat />}

    </div>
  );
};

export default App;