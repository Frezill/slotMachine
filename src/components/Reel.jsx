import { useEffect, useState, useRef } from 'react';

// Simple Reel with CSS animations - no library needed
const Reel = ({ 
  index, 
  isSpinning, 
  range, 
  stopDelay,
  targetValue,
  onStop
}) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const [stopped, setStopped] = useState(true); // Track if THIS reel has stopped
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const targetRef = useRef(targetValue);
  const onStopRef = useRef(onStop);
  const rangeRef = useRef(range);

  // Keep refs updated
  targetRef.current = targetValue;
  onStopRef.current = onStop;
  rangeRef.current = range;

  // Handle spin - only depends on isSpinning and stopDelay
  useEffect(() => {
    if (isSpinning) {
      setStopped(false); // This reel is now spinning
      
      // Start spinning
      intervalRef.current = setInterval(() => {
        const r = rangeRef.current;
        const randomValue = Math.floor(
          Math.random() * (r.max - r.min + 1) + r.min
        );
        setDisplayValue(randomValue);
      }, 20);

      // Stop at the designated time and show target value
      timeoutRef.current = setTimeout(() => {
        // Clear the spinning interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        // Show target digit
        setDisplayValue(targetRef.current);
        // Mark this reel as stopped
        setStopped(true);
        // Play winner sound
        if (onStopRef.current) onStopRef.current();
      }, stopDelay);
    }
    
    // Cleanup when isSpinning changes or component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isSpinning, stopDelay]);

  // Reset when global spin ends and sync targetValue
  useEffect(() => {
    if (!isSpinning) {
      setStopped(true);
      setDisplayValue(targetRef.current);
    }
  }, [isSpinning, targetValue]);

  // Use local 'stopped' state for CSS, not global 'isSpinning'
  const isReelSpinning = isSpinning && !stopped;

  return (
    <div className={`reel ${isReelSpinning ? 'reel--spinning' : 'reel--stopped'}`}>
      <span className="reel__index">D{index + 1}</span>
      <span className={`reel__symbol ${isReelSpinning ? 'reel__symbol--spinning' : ''}`}>
        {displayValue}
      </span>
    </div>
  );
};

export default Reel;
