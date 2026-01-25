import { useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCog, FaHistory } from 'react-icons/fa';
import { 
  startSpin, 
  setSpinComplete,
  setDigitRange,
  clearHistory,
} from '../store/slotSlice';
import Reel from './Reel';
import SettingsModal from './SettingsModal';
import History from './History';

// Import sounds from assets
import spinnerSound from '../assets/spinner-sound.mp3';
import winnerSound from '../assets/winner-sound.mp3';

// Timing adjusted for 11-second spin (matches spinner-sound.mp3 duration)
// Rightmost stops at 3.5s, then each 2.5s apart, leftmost at 11s
const BASE_SPIN_TIME = 3500;
const REEL_STOP_INCREMENT = 2500;
const TOTAL_SPIN_TIME = 11500; // Extra 500ms buffer after last reel stops

const SlotMachine = () => {
  const dispatch = useDispatch();
  const { 
    digitRanges, 
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

  // Handle spin button click - generate all results upfront
  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    
    // Generate all 4 results NOW, before animation starts
    const newResults = digitRanges.map(range => 
      Math.floor(Math.random() * (range.max - range.min + 1) + range.min)
    );
    
    setResults(newResults);
    dispatch(startSpin());
    
    // Play spinner sound
    if (spinnerSoundRef.current) {
      spinnerSoundRef.current.currentTime = 0;
      spinnerSoundRef.current.volume = 0.5; // 50% volume
      spinnerSoundRef.current.play().catch(() => {});
    }
    
    // After all reels stop, save to history and play winner sound
    setTimeout(() => {
      dispatch(setSpinComplete(newResults));
      
      // Stop spinner sound and play winner sound
      if (spinnerSoundRef.current) {
        spinnerSoundRef.current.pause();
      }
      if (winnerSoundRef.current) {
        winnerSoundRef.current.currentTime = 0;
        winnerSoundRef.current.volume = 1.0; // Max volume
        winnerSoundRef.current.play().catch(() => {});
      }
    }, TOTAL_SPIN_TIME);
  }, [dispatch, isSpinning, digitRanges]);

  // Handle range change for a digit
  const handleRangeChange = useCallback((index, { min, max }) => {
    // Ensure min <= max
    const validMin = Math.min(min, max);
    const validMax = Math.max(min, max);
    dispatch(setDigitRange({ index, min: validMin, max: validMax }));
  }, [dispatch]);

  // Handle clear history
  const handleClearHistory = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  // Calculate stop delay for each reel (right to left: index 3 stops first)
  const getStopDelay = (index) => {
    // Reverse order: rightmost (index 3) stops first
    const reverseIndex = 3 - index;
    return BASE_SPIN_TIME + (reverseIndex * REEL_STOP_INCREMENT);
  };

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
          {digitRanges.map((range, index) => (
            <Reel
              key={index}
              index={index}
              isSpinning={isSpinning}
              range={range}
              stopDelay={getStopDelay(index)}
              targetValue={results[index]}
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
        digitRanges={digitRanges}
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
