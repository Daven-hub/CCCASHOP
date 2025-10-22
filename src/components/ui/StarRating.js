import React from 'react';

const StarRating = ({ rating,size='20px' }) => {
  const totalStars = 5;

  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <span
            key={index}
            style={{
              color: starNumber <= rating ? 'gold' : 'lightgray',
              fontSize: size,
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