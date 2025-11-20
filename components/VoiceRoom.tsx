import React from 'react';
import { VoiceRoom as VoiceRoomType } from '../types';
import { Mic, MicOff, PhoneOff, MessageCircle, Users } from 'lucide-react';

interface VoiceRoomProps {
  room: VoiceRoomType;
  onLeave: () => void;
}

export const VoiceRoom: React.FC<VoiceRoomProps> = ({ room, onLeave }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col animate-in slide-in-from-bottom-full duration-300">
      {/* Header */}
      <div className="p-6 flex justify-between items-start">
        <button onClick={onLeave} className="p-2 bg-slate-800 rounded-full text-slate-400">
          <span className="sr-only">Minimize</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-white">LIVE</span>
        </div>
      </div>

      {/* Room Info */}
      <div className="px-8 text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">{room.topic}</h2>
        <p className="text-slate-400 text-sm">Hosted by {room.hostName}</p>
      </div>

      {/* Speakers Stage */}
      <div className="flex-1 px-4">
        <div className="grid grid-cols-3 gap-4 justify-items-center">
          {/* Host */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-2xl text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] voice-pulse">
                🐰
              </div>
              <div className="absolute bottom-0 right-0 bg-slate-900 rounded-full p-1">
                <Mic size={14} className="text-white" />
              </div>
            </div>
            <span className="text-white text-sm font-medium">{room.hostName}</span>
          </div>

          {/* Other Speaker */}
          <div className="flex flex-col items-center gap-2">
             <div className="relative">
              <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-2xl text-white">
                🦊
              </div>
            </div>
            <span className="text-slate-300 text-sm">Guest</span>
          </div>
        </div>
      </div>

      {/* Listener Area */}
      <div className="bg-slate-800/50 rounded-t-3xl p-6">
        <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm font-medium uppercase tracking-wider">
          <Users size={16} />
          <span>Listeners ({room.listeners})</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-12 h-12 rounded-full bg-slate-700 flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 p-6 pb-10 border-t border-slate-800 flex justify-around items-center">
         <button className="p-4 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
           <MicOff size={24} />
         </button>
         
         <button 
            onClick={onLeave}
            className="p-6 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
         >
           <PhoneOff size={32} fill="currentColor" />
         </button>

         <button className="p-4 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors">
           <MessageCircle size={24} />
         </button>
      </div>
    </div>
  );
};