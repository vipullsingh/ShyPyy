import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { User } from '../types';
import { INTERESTS_LIST } from '../constants';
import { ArrowRight, Mic, Bell } from 'lucide-react';

interface OnboardingProps {
  onComplete: (userProfile: Partial<User>) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Splash Screen Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(1);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Step 0: Splash
  if (step === 0) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-violet-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-pink-200 mb-4 tracking-tight animate-pulse">
          ShyPy
        </h1>
        <p className="text-violet-300 text-lg font-light tracking-wide">Where Vibes Connect, Not Faces.</p>
      </div>
    );
  }

  // Step 1: Intro Carousel
  if (step === 1) {
    return (
      <div className="h-screen w-full flex flex-col p-8 justify-between bg-slate-900">
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-64 h-64 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl absolute pointer-events-none" />
          <h2 className="text-3xl font-bold text-white relative z-10">Talk without filters.</h2>
          <p className="text-slate-400 max-w-xs relative z-10">Every conversation builds your Synergy score. Reveal your truest self anonymously.</p>
        </div>
        <Button onClick={() => setStep(2)} size="lg">Get Started</Button>
      </div>
    );
  }

  // Step 2: Sign In / Identity
  if (step === 2) {
    return (
      <div className="h-screen w-full flex flex-col p-8 justify-center bg-slate-900 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Who are you?</h2>
          <p className="text-slate-400">Choose an anonymous identity.</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">Nickname</label>
            <input 
              type="text" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-violet-500 transition-colors"
              placeholder="e.g. WanderingMind"
            />
          </div>
          
          <div>
            <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">Select Avatar</label>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {['🦊', '🐼', '👽', '🤖', '👻', '🦉'].map((emoji) => (
                <button key={emoji} className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-2xl hover:bg-violet-600 transition-colors flex-shrink-0">
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button 
          onClick={() => setStep(3)} 
          disabled={!nickname}
          size="lg"
          className="mt-8"
        >
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Step 3: Permissions
  if (step === 3) {
    return (
      <div className="h-screen w-full flex flex-col p-8 justify-center bg-slate-900 text-center space-y-8">
        <div className="mx-auto w-20 h-20 bg-violet-500/20 rounded-full flex items-center justify-center text-violet-400">
          <Mic size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">ShyPy needs your voice</h2>
          <p className="text-slate-400">Microphone access is required for anonymous calls and rooms.</p>
        </div>
        <div className="space-y-3">
            <Button onClick={() => setStep(4)} variant="primary" size="lg">Enable Microphone</Button>
            <Button onClick={() => setStep(4)} variant="ghost">Skip for now</Button>
        </div>
      </div>
    );
  }

  // Step 4: Interests
  if (step === 4) {
    const toggleInterest = (interest: string) => {
      if (selectedInterests.includes(interest)) {
        setSelectedInterests(prev => prev.filter(i => i !== interest));
      } else {
        if (selectedInterests.length < 5) {
          setSelectedInterests(prev => [...prev, interest]);
        }
      }
    };

    return (
      <div className="h-screen w-full flex flex-col p-8 bg-slate-900">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">What's your vibe?</h2>
          <p className="text-slate-400">Choose 3-5 topics.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-auto">
          {INTERESTS_LIST.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedInterests.includes(interest)
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50 scale-105'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        <div className="mt-8">
           <Button 
            onClick={() => onComplete({ nickname, interests: selectedInterests })} 
            disabled={selectedInterests.length < 3}
            size="lg"
          >
            Finish Setup
          </Button>
        </div>
      </div>
    );
  }

  return null;
};