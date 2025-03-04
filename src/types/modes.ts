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
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#0f3460',
    },
  },
  'creative': {
    name: 'Creative',
    description: 'Inspiration and creativity',
    colors: {
      primary: '#2d3436',
      secondary: '#636e72',
      accent: '#b2bec3',
    },
  },
  'study': {
    name: 'Study',
    description: 'Academic focus mode',
    colors: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#3498db',
    },
  },
  'sleep': {
    name: 'Sleep',
    description: 'Relaxation and rest',
    colors: {
      primary: '#1e272e',
      secondary: '#2f3542',
      accent: '#57606f',
    },
  },
}; 