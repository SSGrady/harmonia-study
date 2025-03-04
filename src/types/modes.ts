export type FocusMode = 'deep-work' | 'creative' | 'study' | 'sleep';

export interface ModeConfig {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const MODE_CONFIGS: Record<FocusMode, ModeConfig> = {
  'deep-work': {
    name: 'Deep Work',
    description: 'Intense concentration mode',
    colors: {
      primary: '#4a4a8a',
      secondary: '#5a5a9a',
      accent: '#6a6aaa',
    },
  },
  'creative': {
    name: 'Creative',
    description: 'Inspiration and creativity',
    colors: {
      primary: '#8a4a8a',
      secondary: '#9a5a9a',
      accent: '#aa6aaa',
    },
  },
  'study': {
    name: 'Study',
    description: 'Academic focus mode',
    colors: {
      primary: '#8a4a4a',
      secondary: '#9a5a5a',
      accent: '#aa6a6a',
    },
  },
  'sleep': {
    name: 'Sleep',
    description: 'Relaxation and rest',
    colors: {
      primary: '#4a8a4a',
      secondary: '#5a9a5a',
      accent: '#6aaa6a',
    },
  },
}; 