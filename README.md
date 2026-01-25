# 🎰 Lottery Slot Machine - NHÀ THỜ VỊ HƯNG

A 4-digit lottery draw application built for **"HỘI CHỢ XUÂN BÍNH NGỌ 2026"** (Lunar New Year Fair 2026) at Vị Hưng Church.

![Lunar New Year Theme](https://img.shields.io/badge/Theme-Lunar%20New%20Year-red)
![React](https://img.shields.io/badge/React-19.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-purple)

## ✨ Features

- **4-Digit Random Draw** - Four independent spinning reels with configurable ranges (0-9)
- **Right-to-Left Stop Order** - Reels stop sequentially from right to left for dramatic effect
- **11-Second Animation** - Synchronized with spinner sound duration
- **Sound Effects** - Spinning sound during draw, winner celebration sound on completion
- **Configurable Ranges** - Set min/max for each digit via settings modal
- **Draw History** - Keeps track of previous results with timestamps
- **Lunar New Year Theme** - Beautiful red & gold color scheme
- **TV-Friendly Display** - Large, readable numbers for big screens
- **Persistent State** - Settings and history saved across sessions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd slotMachine

# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🎮 Usage

1. **Click DRAW** - Starts the 11-second lottery draw
2. **Watch the Reels** - Numbers spin and stop one by one (right to left)
3. **View Result** - Final 4-digit number displayed after all reels stop
4. **Check History** - Previous draws shown in the history table below

### Settings (⚙️ icon)

- Configure the range (min/max) for each digit
- Default: 0-9 for all digits
- Useful for limiting number pools

## 📁 Project Structure

```
src/
├── assets/
│   ├── background.jpg      # Background image
│   ├── spinner-sound.mp3   # 11-second spinning sound
│   └── winner-sound.mp3    # Celebration sound
├── components/
│   ├── SlotMachine.jsx     # Main container
│   ├── Reel.jsx            # Individual spinning digit
│   ├── SettingsModal.jsx   # Range configuration
│   └── History.jsx         # Previous results table
├── store/
│   ├── index.js            # Redux store setup
│   └── slotSlice.js        # State management
├── styles/
│   ├── _variables.scss     # Color palette
│   ├── _mixins.scss        # SCSS utilities
│   └── main.scss           # Main styles
└── main.jsx                # App entry point
```

## 🎨 Customization

### Change Background
Replace `src/assets/background.jpg` with your image.

### Change Sounds
Replace the MP3 files in `src/assets/`:
- `spinner-sound.mp3` - Should be ~11 seconds
- `winner-sound.mp3` - Celebration sound

### Adjust Timing
In `SlotMachine.jsx`:
```javascript
const BASE_SPIN_TIME = 3500;      // First reel stops at 3.5s
const REEL_STOP_INCREMENT = 2500; // Each subsequent reel: +2.5s
const TOTAL_SPIN_TIME = 11500;    // Total duration + buffer
```

### Adjust Volume
In `SlotMachine.jsx`:
```javascript
spinnerSoundRef.current.volume = 0.5; // 50% for spinner
winnerSoundRef.current.volume = 1.0;  // 100% for winner
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Redux Toolkit** - State management
- **Redux Persist** - Persistent storage
- **SCSS** - Styling
- **React Icons** - Icon library

## 📄 License

MIT License

---

Made with ❤️ for **NHÀ THỜ VỊ HƯNG** - Lunar New Year Fair 2026
