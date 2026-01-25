import { useEffect, useState, useRef } from 'react';

// Simple Reel with CSS animations - no library needed
const Reel = ({ 
  index, 
  isSpinning, 
  range, 
  stopDelay,
  targetValue
}) => {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const [spinning, setSpinning] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const targetRef = useRef(targetValue);

  // Always keep targetRef updated
  targetRef.current = targetValue;

  useEffect(() => {
    if (isSpinning && !spinning) {
      setSpinning(true);
      
      // Rapid number changes during spin
      intervalRef.current = setInterval(() => {
        const randomValue = Math.floor(
          Math.random() * (range.max - range.min + 1) + range.min
        );
        setDisplayValue(randomValue);
      }, 50);

      // Stop and show target value
      timeoutRef.current = setTimeout(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayValue(targetRef.current);
        setSpinning(false);
      }, stopDelay);
    }

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
  }, [isSpinning, stopDelay, range]);

  // Sync with targetValue when not spinning
  useEffect(() => {
    if (!isSpinning && !spinning) {
      setDisplayValue(targetRef.current);
    }
  }, [targetValue, isSpinning, spinning]);

  return (
    <div className={`reel ${spinning ? 'reel--spinning' : 'reel--stopped'}`}>
      <span className="reel__index">D{index + 1}</span>
      <span className={`reel__symbol ${spinning ? 'reel__symbol--spinning' : ''}`}>
        {displayValue}
      </span>
    </div>
  );
};

export default Reel;
