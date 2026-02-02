const RangeSettings = ({ numericRange, onRangeChange, disabled }) => {
  const handleChange = (field, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 9999) {
      onRangeChange({
        min: field === 'min' ? numValue : numericRange.min,
        max: field === 'max' ? numValue : numericRange.max,
      });
    }
  };

  return (
    <div className="range-settings">
      <div className="range-settings__title">
        Numeric Range Settings (0000-9999)
      </div>
      <div className="range-settings__numeric">
        <div className="range-settings__numeric-row">
          <label className="range-settings__label">From (Min)</label>
          <input
            type="number"
            className="range-settings__numeric-input"
            placeholder="0"
            value={numericRange.min}
            onChange={(e) => handleChange('min', e.target.value)}
            min={0}
            max={9999}
            disabled={disabled}
          />
        </div>
        <div className="range-settings__numeric-row">
          <label className="range-settings__label">To (Max)</label>
          <input
            type="number"
            className="range-settings__numeric-input"
            placeholder="9999"
            value={numericRange.max}
            onChange={(e) => handleChange('max', e.target.value)}
            min={0}
            max={9999}
            disabled={disabled}
          />
        </div>
      </div>
      <p style={{ 
        fontSize: '0.75rem', 
        color: 'rgba(255,255,255,0.6)', 
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 0
      }}>
        Example: Min=0, Max=400 generates numbers from 0000 to 0400
        <br />
        (Can produce 0000, 0001, 0002, ..., 0377, 0378, ..., 0400)
      </p>
      <p style={{ 
        fontSize: '0.7rem', 
        color: 'rgba(255,255,255,0.4)', 
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 0
      }}>
        Reels stop from right to left (D4 → D1)
      </p>
    </div>
  );
};

export default RangeSettings;
