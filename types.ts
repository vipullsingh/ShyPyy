export enum SynergyLevel {
  NONE = 0,
  DM = 100,
  VOICE = 300,
  VIDEO = 500,
  PARTNER = 1000
}

export interface User {
  id: string;
  nickname: string;
  avatarEmoji: string;
  synergyScore: number;
  vibe: 'Deep' | 'Casual' | 'Fun';
  interests: string[];
}

export interface Post {
  id: string;
  authorId: string;
  authorNickname: string;
  content: string;
  tag: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface VoiceRoom {
  id: string;
  topic: string;
  hostName: string;
  listeners: number;
  speakers: number;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: Date;
}

export enum PageView {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  FEED = 'FEED',
  PROFILE = 'PROFILE',
  VOICE_ROOM = 'VOICE_ROOM'
}