import { FaCoins, FaTrophy, FaDice } from 'react-icons/fa';

const Display = ({ balance, betAmount, lastWin }) => {
  return (
    <div className="display">
      <div className="display__item">
        <div className="display__item-label">
          <FaCoins style={{ marginRight: 4 }} /> Balance
        </div>
        <div className="display__item-value">${balance.toLocaleString()}</div>
      </div>
      
      <div className="display__item">
        <div className="display__item-label">
          <FaDice style={{ marginRight: 4 }} /> Bet
        </div>
        <div className="display__item-value">${betAmount}</div>
      </div>
      
      <div className="display__item display__item--win">
        <div className="display__item-label">
          <FaTrophy style={{ marginRight: 4 }} /> Last Win
        </div>
        <div className="display__item-value">
          {lastWin > 0 ? `+$${lastWin}` : '-'}
        </div>
      </div>
    </div>
  );
};

export default Display;
