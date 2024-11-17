import React from 'react';
import styles from './MarqueeText.module.css'

const MarqueeText = ({
  text,
  speed = 50, 
  direction = 'left', 
  pauseOnHover = false, 
  className = '', 
}) => {
  const marqueeStyle = {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    animation: `marquee ${text.length / speed}s linear infinite`,
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
  };

  const containerStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
  };

  return (
    <div
      className={className}
      style={{
        ...containerStyle,
        ...(pauseOnHover
          ? { animationPlayState: 'paused', cursor: 'pointer' }
          : {}),
      }}
    >
      <span className={styles.marqueeText} style={marqueeStyle}>{text}</span>
    </div>
  );
};

export default MarqueeText;
