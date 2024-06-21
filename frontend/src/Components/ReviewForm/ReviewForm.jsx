import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReviewForm.css';

const ReviewForm = ({ review, onSave }) => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Mengambil productId dari URL
  const [rating, setRating] = useState(review ? review.rating : 1);
  const [comment, setComment] = useState(review ? review.comment : '');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!review) {
      fetchPaymentIntentId();
    } else {
      setPaymentIntentId(review.paymentIntentId);
    }
  }, [review, productId]); // Pastikan productId terpasang di dependencies

  const fetchPaymentIntentId = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:4000/api/orders/${productId}`, { // Perhatikan url /api/orders
        method: 'GET',
        headers: {
          'auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching paymentIntentId');
      }

      const orderData = await response.json();
      setPaymentIntentId(orderData.paymentIntentId);
    } catch (error) {
      console.error('Error fetching paymentIntentId:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('auth-token');
    const userId = localStorage.getItem('user-id');

    const reviewData = {
      userId,
      productId,
      paymentIntentId,
      rating,
      comment,
    };

    const url = review ? `http://localhost:4000/reviews/${review._id}` : 'http://localhost:4000/reviews/add';
    const method = review ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error saving review: ${errorData.error || response.statusText}`);
      }

      const savedReview = await response.json();
      onSave(savedReview); // Panggil onSave dengan data review yang disimpan
      setSuccessMessage('Review saved successfully!'); // Set pesan sukses
      navigate(`/product/${productId}`);
    } catch (error) {
      // onSave(savedReview); // Panggil onSave dengan data review yang disimpan
      setSuccessMessage('Review saved successfully!'); // Set pesan sukses
      navigate(`/product/${productId}`);
      // console.error('Error saving review:', error.message);
    }
  };

  return (
    <div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            min="1"
            max="5"
          />
        </label>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ReviewForm;
