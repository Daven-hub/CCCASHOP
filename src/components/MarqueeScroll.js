import React, { useState, useEffect } from "react";
import "./MarqueeScroll.css";

const MarqueeScroll = ({ items, speed = 5000, pause = 1000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, speed + pause);

    return () => clearInterval(interval);
  }, [items, speed, pause]);

  return (
    <div className="marquee-container">
      <div
        className="marquee-item"
        style={{
          animation: `scroll ${speed}ms linear`,
        }}
        key={currentIndex}
      >
        {items[currentIndex]}
      </div>
    </div>
  );
};

export default MarqueeScroll;
