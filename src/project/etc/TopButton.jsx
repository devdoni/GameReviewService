import React, { useState, useEffect } from 'react';
import '../css/index.css';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="top-button">
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top">
          TOP
        </button>
      )}
    </div>
  );
};

export default TopButton;