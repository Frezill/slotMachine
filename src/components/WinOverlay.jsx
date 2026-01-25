import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WinOverlay = ({ show, amount, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="win-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="win-overlay__content"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            🎉 WIN +${amount}! 🎉
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinOverlay;
