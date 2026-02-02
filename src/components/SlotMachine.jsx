import { useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCog, FaHistory } from 'react-icons/fa';
import { 
  startSpin, 
  setSpinComplete,
  setNumericRange,
  clearHistory,
} from '../store/slotSlice';
import Reel from './Reel';
import SettingsModal from './SettingsModal';
import History from './History';

// Import sounds from assets
import spinnerSound from '../assets/spinner-sound.mp3';
import winnerSound from '../assets/winner-sound.mp3';

// Timing: Play sound 3 times, each digit appears at end of each sound play
// Sound duration is ~11 seconds
const SOUND_DURATION = 11000;
const REEL_STOP_TIMES = {
  3: SOUND_DURATION,           // D4 - appears at end of 1st sound play (~11s)
  2: SOUND_DURATION * 2,       // D3 - appears at end of 2nd sound play (~22s)
  1: SOUND_DURATION * 3,       // D2 - appears at end of 3rd sound play (~33s)
  0: SOUND_DURATION * 3,       // D1 - appears with D2 at end of 3rd sound (~33s)
};
const TOTAL_SPIN_TIME = SOUND_DURATION * 3 + 500; // 3 sound plays + buffer

const SlotMachine = () => {
  const dispatch = useDispatch();
  const { 
    numericRange, 
    isSpinning,
    history,
  } = useSelector((state) => state.slot);
  
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  // Single source of truth for results
  const [results, setResults] = useState([0, 0, 0, 0]);
  
  // Audio refs
  const spinnerSoundRef = useRef(null);
  const winnerSoundRef = useRef(null);
  const soundLoopTimeoutRef = useRef(null);
  const spinCompleteTimeoutRef = useRef(null);

  // Play winner sound when a digit appears
  const playWinnerSound = useCallback(() => {
    if (winnerSoundRef.current) {
      winnerSoundRef.current.currentTime = 0;
      winnerSoundRef.current.volume = 1.0;
      winnerSoundRef.current.play().catch(() => {});
    }
  }, []);

  // Handle spin button click - generate all results upfront
  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    
    // Generate a random number within the numeric range
    const randomNumber = Math.floor(
      Math.random() * (numericRange.max - numericRange.min + 1) + numericRange.min
    );
    
    // Convert to 4 digits (pad with zeros)
    const paddedNumber = randomNumber.toString().padStart(4, '0');
    const newResults = paddedNumber.split('').map(Number);
    
    setResults(newResults);
    dispatch(startSpin());
    
    // Clear any previous timeouts
    if (soundLoopTimeoutRef.current) {
      clearTimeout(soundLoopTimeoutRef.current);
    }
    if (spinCompleteTimeoutRef.current) {
      clearTimeout(spinCompleteTimeoutRef.current);
    }
    
    // Play spinner sound 3 times - each time a digit appears
    let currentPlayCount = 1;
    const playSound = () => {
      if (spinnerSoundRef.current && currentPlayCount <= 3) {
        spinnerSoundRef.current.currentTime = 0;
        spinnerSoundRef.current.volume = 0.5;
        spinnerSoundRef.current.play().catch(() => {});
        
        // When sound ends, play again if not done
        if (currentPlayCount < 3) {
          currentPlayCount++;
          soundLoopTimeoutRef.current = setTimeout(playSound, SOUND_DURATION);
        }
      }
    };
    
    // Start first sound play
    playSound();
    
    // After all reels stop, save to history
    spinCompleteTimeoutRef.current = setTimeout(() => {
      dispatch(setSpinComplete(newResults));
      
      // Stop spinner sound
      if (spinnerSoundRef.current) {
        spinnerSoundRef.current.pause();
      }
      
      // Clear timeout refs
      soundLoopTimeoutRef.current = null;
      spinCompleteTimeoutRef.current = null;
    }, TOTAL_SPIN_TIME);
  }, [dispatch, isSpinning, numericRange]);

  // Handle range change
  const handleRangeChange = useCallback(({ min, max }) => {
    // Ensure min <= max
    const validMin = Math.min(min, max);
    const validMax = Math.max(min, max);
    dispatch(setNumericRange({ min: validMin, max: validMax }));
  }, [dispatch]);

  // Handle clear history
  const handleClearHistory = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  return (
    <div className="slot-machine">
      <div className="slot-machine__header">
        <h1 className="slot-machine__title">NHÀ THỜ VỊ HƯNG</h1>
        <h2 className="slot-machine__subtitle">HỘI CHỢ XUÂN BÍNH NGỌ 2026</h2>
      </div>
      
      <div className="slot-machine__cabinet">
        <button 
          className="slot-machine__history-btn"
          onClick={() => setShowHistory(true)}
          disabled={isSpinning}
          title="History"
        >
          <FaHistory />
        </button>
        
        <button 
          className="slot-machine__settings-btn"
          onClick={() => setShowSettings(true)}
          disabled={isSpinning}
          title="Settings"
        >
          <FaCog />
        </button>

        <div className="reels">
          {[0, 1, 2, 3].map((index) => (
            <Reel
              key={index}
              index={index}
              isSpinning={isSpinning}
              range={{ min: 0, max: 9 }}
              stopDelay={REEL_STOP_TIMES[index]}
              targetValue={results[index]}
              onStop={playWinnerSound}
            />
          ))}
        </div>
        
        <div className="slot-machine__result">
          {!isSpinning && results.join('')}
        </div>

        <button
          className={`slot-machine__spin-btn ${isSpinning ? 'slot-machine__spin-btn--spinning' : ''}`}
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? 'ĐANG QUAY...' : 'QUAY'}
        </button>
      </div>
      
      <SettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
        numericRange={numericRange}
        onRangeChange={handleRangeChange}
      />

      <History 
        show={showHistory}
        onClose={() => setShowHistory(false)}
        history={history} 
        onClear={handleClearHistory}
      />
      
      {/* Audio elements */}
      <audio ref={spinnerSoundRef} src={spinnerSound} preload="auto" />
      <audio ref={winnerSoundRef} src={winnerSound} preload="auto" />
    </div>
  );
};

export default SlotMachine;
