import { FaCog } from 'react-icons/fa';

const RangeSettings = ({ digitRanges, onRangeChange, disabled }) => {
  const handleChange = (index, field, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 9) {
      const currentRange = digitRanges[index];
      onRangeChange(index, {
        min: field === 'min' ? numValue : currentRange.min,
        max: field === 'max' ? numValue : currentRange.max,
      });
    }
  };

  return (
    <div className="range-settings">
      <div className="range-settings__title">
        <FaCog style={{ marginRight: 8 }} />
        Digit Range Settings (0-9)
      </div>
      <div className="range-settings__grid">
        {digitRanges.map((range, index) => (
          <div key={index} className="range-settings__digit">
            <span className="range-settings__digit-label">
              Digit {index + 1}
            </span>
            <div className="range-settings__digit-inputs">
              <input
                type="number"
                className="range-settings__digit-input"
                placeholder="Min"
                value={range.min}
                onChange={(e) => handleChange(index, 'min', e.target.value)}
                min={0}
                max={9}
                disabled={disabled}
              />
              <input
                type="number"
                className="range-settings__digit-input"
                placeholder="Max"
                value={range.max}
                onChange={(e) => handleChange(index, 'max', e.target.value)}
                min={0}
                max={9}
                disabled={disabled}
              />
            </div>
          </div>
        ))}
      </div>
      <p style={{ 
        fontSize: '0.7rem', 
        color: 'rgba(255,255,255,0.4)', 
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 0
      }}>
        Reels stop from right to left (D4 → D1)
      </p>
    </div>
  );
};

export default RangeSettings;
