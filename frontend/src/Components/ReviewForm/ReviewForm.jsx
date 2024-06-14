// Misalkan ini adalah komponen yang memerlukan userId, seperti ReviewForm.jsx

import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ productId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem('auth-token');

      // Call onSubmit prop with review data
      const response = await fetch('http://localhost:4000/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token, // Include token in headers
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
        }),
      });

      const data = await response.json();
      console.log('Review submitted:', data);

      // Optional: Reset form state after successful submission
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Add Review</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
