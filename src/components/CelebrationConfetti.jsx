// file: src/components/CelebrationConfetti.jsx

import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const CelebrationConfetti = () => {
  // Window का आकार पाने के लिए ताकि कंफ़ेद्दी पूरी स्क्रीन पर फैले
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={400}
    />
  );
};

export default CelebrationConfetti;