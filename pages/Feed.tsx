import React, { useState } from 'react';
import { User, Post, VoiceRoom } from '../types';
import { SAMPLE_POSTS, SAMPLE_ROOMS } from '../constants';
import { MessageSquare, Heart, Mic, Play, Plus, Sparkles } from 'lucide-react';
import { analyzePostVibe } from '../services/geminiService';
import { Button } from '../components/Button';

interface FeedProps {
  onJoinRoom: (room: VoiceRoom) => void;
}

export const Feed: React.FC<FeedProps> = ({ onJoinRoom }) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'now' | 'wakeup'>('topics');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [analyzingVibe, setAnalyzingVibe] = useState(false);
  const [detectedVibe, setDetectedVibe] = useState<string | null>(null);

  const handleVibeCheck = async () => {
    if (!newPostContent) return;
    setAnalyzingVibe(true);
    const vibe = await analyzePostVibe(newPostContent);
    setDetectedVibe(vibe);
    setAnalyzingVibe(false);
  };

  return (
    <div className="pb-24 pt-4">
      {/* Tabs */}
      <div className="flex px-4 mb-6 gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'topics', label: '💭 Topics' },
          { id: 'now', label: '🕒 Live Now' },
          { id: 'wakeup', label: '⏰ Wake-Up' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900' 
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 space-y-4">
        
        {activeTab === 'topics' && (
          <div className="space-y-4">
            {SAMPLE_POSTS.map(post => (
              <div key={post.id} className="bg-slate-800/50 backdrop-blur border border-white/5 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs">
                      {post.authorNickname[0]}
                    </div>
                    <span className="font-medium text-slate-200 text-sm">{post.authorNickname}</span>
                  </div>
                  <span className="text-xs text-slate-500">{post.timestamp}</span>
                </div>
                <p className="text-slate-200 mb-4 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 rounded-md bg-violet-500/10 text-violet-300 text-xs font-medium border border-violet-500/20">
                    {post.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <div className="flex gap-4 text-slate-400 text-sm">
                    <button className="flex items-center gap-1 hover:text-pink-500 transition-colors">
                      <Heart size={16} /> {post.likes}
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                      <MessageSquare size={16} /> {post.comments}
                    </button>
                  </div>
                  <button className="p-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                    <Mic size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'now' && (
          <div className="grid gap-4">
            {SAMPLE_ROOMS.map(room => (
              <div key={room.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Mic size={80} />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-white pr-8 leading-tight">{room.topic}</h3>
                    <div className="flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-bold animate-pulse">
                      LIVE
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">Hosted by {room.hostName}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700" />
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-xs text-slate-400">
                        +{room.listeners}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => onJoinRoom(room)}>
                      Join <Play size={14} className="ml-1 fill-current" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wakeup' && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
             <div className="w-24 h-24 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full blur-xl opacity-20 absolute" />
             <h3 className="text-2xl font-bold text-white mb-2 relative">Wake Up with Vibes</h3>
             <p className="text-slate-400 mb-8 max-w-xs relative">Schedule a call to be woken up by a friendly stranger, or wake someone up!</p>
             <div className="bg-slate-800 p-6 rounded-2xl w-full max-w-xs border border-white/5 shadow-xl">
               <div className="text-4xl font-bold text-white mb-2">07:00 <span className="text-lg text-slate-500 font-medium">AM</span></div>
               <div className="flex items-center justify-between text-sm text-slate-400 mb-6">
                 <span>Tomorrow</span>
                 <span className="text-violet-400 cursor-pointer">Change</span>
               </div>
               <Button className="w-full">Set Alarm</Button>
             </div>
          </div>
        )}

      </div>

      {/* FAB */}
      <button 
        onClick={() => setShowCreatePost(true)}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white text-slate-900 p-4 rounded-full shadow-lg shadow-white/10 hover:scale-105 transition-transform z-30"
      >
        <Plus size={24} />
      </button>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 space-y-4 animate-in slide-in-from-bottom-10">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-white">Create Topic</h3>
              <button onClick={() => setShowCreatePost(false)} className="text-slate-400 hover:text-white">Close</button>
            </div>
            
            <textarea 
              className="w-full bg-slate-800 rounded-xl p-4 text-white min-h-[120px] focus:outline-none focus:ring-1 focus:ring-violet-500"
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />

            {/* Gemini Feature: Vibe Check */}
            <div className="flex items-center justify-between">
               <button 
                 onClick={handleVibeCheck}
                 disabled={analyzingVibe || !newPostContent}
                 className="flex items-center gap-2 text-sm text-violet-300 hover:text-violet-200 disabled:opacity-50"
               >
                 <Sparkles size={16} />
                 {analyzingVibe ? "AI Analyzing..." : "Check Vibe"}
               </button>
               {detectedVibe && (
                 <span className="text-xs bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-2 py-1 rounded">
                   {detectedVibe}
                 </span>
               )}
            </div>

            <div className="flex gap-2 justify-end pt-2">
               <Button size="sm" variant="ghost" onClick={() => setShowCreatePost(false)}>Cancel</Button>
               <Button size="sm" onClick={() => setShowCreatePost(false)}>Post</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};