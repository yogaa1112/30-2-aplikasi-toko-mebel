import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DescriptionBox.css';
import ReviewForm from '../ReviewForm/ReviewForm';
import StarRating from '../StarRating/StarRating';

const DescriptionBox = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/reviews/${productId}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [productId]);

  const addReview = (review) => {
    fetch(' http://localhost:4000/api/reviews/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Assuming token is stored in localStorage
      },
      body: JSON.stringify({ ...review, productId })
    })
      .then(response => response.json())
      .then(newReview => setReviews([...reviews, newReview]))
      .catch(error => console.error('Error adding review:', error));
  };

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box fade">Reviews ({reviews.length})</div>
      </div>
      <div className="descriptionbox-description">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.name}</strong></p>
            <StarRating rating={review.rating} />
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <ReviewForm onSubmit={addReview} />
    </div>
  );
};

export default DescriptionBox;
