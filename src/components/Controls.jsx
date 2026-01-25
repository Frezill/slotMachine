import { FaPlay, FaSpinner } from 'react-icons/fa';

const Controls = ({ 
  isSpinning, 
  onSpin, 
  betAmount, 
  onBetChange, 
  balance,
  canSpin 
}) => {
  const handleBetChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onBetChange(value);
    }
  };

  return (
    <div className="controls">
      <div className="controls__row">
        <div className="controls__bet">
          <span className="controls__bet-label">Bet Amount:</span>
          <input
            type="number"
            className="controls__bet-input"
            value={betAmount}
            onChange={handleBetChange}
            min={1}
            max={balance}
            disabled={isSpinning}
          />
        </div>
      </div>
      
      <div className="controls__row">
        <button
          className={`controls__spin-btn ${isSpinning ? 'controls__spin-btn--spinning' : ''}`}
          onClick={onSpin}
          disabled={!canSpin || isSpinning}
        >
          {isSpinning ? (
            <>
              <FaSpinner className="me-2" style={{ animation: 'spin 1s linear infinite' }} />
              Spinning...
            </>
          ) : (
            <>
              <FaPlay className="me-2" />
              Spin
            </>
          )}
        </button>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Controls;
