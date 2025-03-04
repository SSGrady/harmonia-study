import { FocusMode, MODE_CONFIGS } from '../../types/modes';

interface ModeSelectorProps {
  currentMode: FocusMode;
  onModeSelect: (mode: FocusMode) => void;
}

export const ModeSelector = ({ currentMode, onModeSelect }: ModeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-4">
      {(Object.keys(MODE_CONFIGS) as FocusMode[]).map((mode) => (
        <button
          key={mode}
          onClick={() => onModeSelect(mode)}
          className={`px-6 py-3 rounded-lg transition-all duration-300 ${
            currentMode === mode
              ? 'bg-white text-black shadow-lg'
              : 'bg-black/20 text-white hover:bg-black/30'
          }`}
        >
          <h3 className="text-lg font-semibold">{MODE_CONFIGS[mode].name}</h3>
          <p className="text-sm opacity-80">{MODE_CONFIGS[mode].description}</p>
        </button>
      ))}
    </div>
  );
}; 