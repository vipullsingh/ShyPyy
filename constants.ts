import { Mic, Home, MessageCircle, User, Bell } from 'lucide-react';

export const APP_NAME = "ShyPy";

export const INTERESTS_LIST = [
  "Mental Health", "Tech", "Motivation", "Dreams", "Art", "Gaming", "Philosophy", "Music", "Relationships", "Career"
];

export const NAV_ITEMS = [
  { id: 'feed', label: 'Feed', icon: Home },
  { id: 'now', label: 'Live', icon: Mic },
  { id: 'messages', label: 'Chat', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: User },
];

export const SAMPLE_POSTS = [
  {
    id: '1',
    authorId: 'user_1',
    authorNickname: 'WanderingMind',
    content: 'Does anyone else feel like 3AM is the only time the world makes sense?',
    tag: 'Deep Thought',
    likes: 24,
    comments: 5,
    timestamp: '2m ago'
  },
  {
    id: '2',
    authorId: 'user_2',
    authorNickname: 'NeonDreamer',
    content: 'Just finished my first marathon. My legs are jelly but my soul is flying.',
    tag: 'Motivation',
    likes: 156,
    comments: 12,
    timestamp: '15m ago'
  },
  {
    id: '3',
    authorId: 'user_3',
    authorNickname: 'QuietStorm',
    content: 'Why is making friends as an adult so incredibly awkward?',
    tag: 'Question',
    likes: 89,
    comments: 34,
    timestamp: '1h ago'
  }
];

export const SAMPLE_ROOMS = [
  {
    id: 'room_1',
    topic: 'Late Night Lo-fi & Chill',
    hostName: 'VinylCat',
    listeners: 42,
    speakers: 3,
    isActive: true
  },
  {
    id: 'room_2',
    topic: 'Tech Layoffs Support Group',
    hostName: 'DevOpsDan',
    listeners: 128,
    speakers: 6,
    isActive: true
  }
];