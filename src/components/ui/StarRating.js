// import { StarsIcon } from 'hugeicons-react';
import { Star } from 'lucide-react';
import React from 'react';

const StarRating = ({ rating,size=15 }) => {
  const totalStars = 5;

  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          // <span
          //   key={index}
          //   style={{
          //     color: starNumber <= rating ? 'gold' : 'lightgray',
          //     fontSize: size,
          //     cursor: 'pointer',
          //   }}
          // >
          //   ★
          // </span>
          <Star
            key={index}
            size={size}
            style={{
              // fontSize: size,
              cursor: 'pointer',
              fill: starNumber <= rating ? 'gold' : 'transparent',
              stroke: 'gold',
              strokeWidth: '1.5px',
            }}
            className="transition-all duration-200"
          />
        );
      })}
    </div>
  );
};

export default StarRating;