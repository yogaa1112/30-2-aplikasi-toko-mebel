// src/Components/StarRating/StarRating.jsx
import React from 'react';
import starFull from '../Assets/star_icon.png';
import starEmpty from '../Assets/star_dull_icon.png';
import './StarRating.css';

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<img key={i} src={starFull} alt="star" className="star" />);
    } else {
      stars.push(<img key={i} src={starEmpty} alt="star" className="star" />);
    }
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
