import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCog } from 'react-icons/fa';

const SettingsModal = ({ show, onClose, digitRanges, onRangeChange }) => {
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
    <AnimatePresence>
      {show && (
        <motion.div
          className="settings-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="settings-modal"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-modal__header">
              <h2 className="settings-modal__title">
                <FaCog className="me-2" />
                Digit Range Settings
              </h2>
              <button className="settings-modal__close" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="settings-modal__body">
              <p className="settings-modal__description">
                Configure the number range (0-9) for each digit position.
                <br />
                <small>Reels stop from right to left (D4 → D1)</small>
              </p>

              <div className="settings-modal__grid">
                {digitRanges.map((range, index) => (
                  <div key={index} className="settings-modal__digit">
                    <span className="settings-modal__digit-label">
                      Digit {index + 1}
                    </span>
                    <div className="settings-modal__digit-inputs">
                      <div className="settings-modal__input-group">
                        <label>Min</label>
                        <input
                          type="number"
                          className="settings-modal__input"
                          value={range.min}
                          onChange={(e) => handleChange(index, 'min', e.target.value)}
                          min={0}
                          max={9}
                        />
                      </div>
                      <div className="settings-modal__input-group">
                        <label>Max</label>
                        <input
                          type="number"
                          className="settings-modal__input"
                          value={range.max}
                          onChange={(e) => handleChange(index, 'max', e.target.value)}
                          min={0}
                          max={9}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="settings-modal__footer">
              <button className="settings-modal__done-btn" onClick={onClose}>
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
