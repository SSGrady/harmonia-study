import { useState } from 'react'
import { ModeSelector } from './components/ModeSelector/ModeSelector'
import { FocusMode } from './types/modes'

function App() {
  const [currentMode, setCurrentMode] = useState<FocusMode>('deep-work')

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Harmonia Study</h1>
        <ModeSelector currentMode={currentMode} onModeSelect={setCurrentMode} />
      </main>
    </div>
  )
}

export default App
