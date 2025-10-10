import React from 'react';

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <span
            key={index}
            style={{
              color: starNumber <= rating ? 'gold' : 'lightgray',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;