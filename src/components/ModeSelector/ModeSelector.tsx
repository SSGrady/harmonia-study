import { FocusMode, MODE_CONFIGS } from '../../types/modes';

interface ModeSelectorProps {
  currentMode: FocusMode;
  onModeChange: (mode: FocusMode) => void;
}

export const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex justify-around items-center">
          {(Object.keys(MODE_CONFIGS) as FocusMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                currentMode === mode
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {mode.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 