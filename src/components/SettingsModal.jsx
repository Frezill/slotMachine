import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCog } from 'react-icons/fa';
import RangeSettings from './RangeSettings';

const SettingsModal = ({ show, onClose, numericRange, onRangeChange }) => {
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
                Range Settings
              </h2>
              <button className="settings-modal__close" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="settings-modal__body">
              <RangeSettings 
                numericRange={numericRange}
                onRangeChange={onRangeChange}
                disabled={false}
              />
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
