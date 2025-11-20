import React from 'react';
import { User } from '../types';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileProps {
  user: User;
}

const DATA = [
  { day: 'Mon', score: 120 },
  { day: 'Tue', score: 132 },
  { day: 'Wed', score: 145 },
  { day: 'Thu', score: 160 },
  { day: 'Fri', score: 155 },
  { day: 'Sat', score: 180 },
  { day: 'Sun', score: 210 },
];

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-4xl mb-4 shadow-lg shadow-violet-500/20">
          {user.avatarEmoji || '👤'}
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">{user.nickname || 'Anonymous'}</h2>
        <p className="text-slate-400 text-sm mb-4">Level 2 Connector • {user.vibe} Vibe</p>
        
        <div className="flex gap-2">
            {user.interests?.slice(0,3).map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300">{tag}</span>
            ))}
        </div>
      </div>

      {/* Synergy Score Card */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-white/5 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-violet-500">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Synergy Score</h3>
        <div className="text-4xl font-bold text-white mb-4">{user.synergyScore || 0}</div>
        
        <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-4">
        <h3 className="text-white font-bold">Badges</h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                <div className="text-2xl">🌙</div>
                <div>
                    <div className="text-white text-sm font-bold">Night Owl</div>
                    <div className="text-xs text-slate-500">Active 12AM-4AM</div>
                </div>
            </div>
             <div className="bg-slate-800 p-4 rounded-xl flex items-center gap-3 border border-white/5 opacity-50 grayscale">
                <div className="text-2xl">👂</div>
                <div>
                    <div className="text-white text-sm font-bold">Good Listener</div>
                    <div className="text-xs text-slate-500">Locked</div>
                </div>
            </div>
        </div>
      </div>
      
      <div className="mt-8">
        <button className="w-full py-3 text-red-400 text-sm bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors">
            Log Out
        </button>
      </div>
    </div>
  );
};