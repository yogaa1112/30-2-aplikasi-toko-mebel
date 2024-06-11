// src/Components/ReviewForm/ReviewForm.jsx
import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validasi form
    if (!name || !rating || !comment) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      await onSubmit({ name, rating, comment });
      setName('');
      setRating(0);
      setComment('');
      setSuccess('Review submitted successfully!');
    } catch (err) {
      setError('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reviewform">
      <h2>Leave a Review</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value="0">Select a rating</option>
            <option value="1">1 - Very Bad</option>
            <option value="2">2 - Bad</option>
            <option value="3">3 - Okay</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
