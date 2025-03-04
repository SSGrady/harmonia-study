# Harmonia Study

A modern web app that combines ambient music with 3D gradient backgrounds for different focus modes.

## Requirements

- Node.js 18+
- Modern web browser with WebGL support
- MP3 files for each focus mode playlist

## Tech Stack

- React 18 + TypeScript 5
- Three.js (3D backgrounds)
- Vite (build tool)
- TailwindCSS (styling)
- Howler.js (audio)

## Project Phases

### Phase 1: Foundation
- [ ] Project setup with Vite + React + TypeScript
- [ ] Basic layout and routing
- [ ] Three.js gradient background implementation
- [ ] Mode selection UI

### Phase 2: Audio System
- [ ] Audio player component
- [ ] Playlist management
- [ ] Mode-specific audio transitions
- [ ] Volume and playback controls

### Phase 3: Visual Enhancement
- [ ] Mode-specific color palettes
- [ ] Animated transitions between modes
- [ ] Responsive design
- [ ] Loading states and animations

### Phase 4: Polish
- [ ] Error handling
- [ ] Performance optimization
- [ ] Browser compatibility
- [ ] Documentation

## Quick Start

```bash
git clone https://github.com/ssgrady/harmonia-study.git
cd harmonia-study
npm install
npm run dev
```

Visit `http://localhost:5173` to start using the app.

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## License

MIT