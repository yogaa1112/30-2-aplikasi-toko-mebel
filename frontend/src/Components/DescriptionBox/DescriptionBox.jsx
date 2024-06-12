import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams untuk mendapatkan parameter URL
import './DescriptionBox.css';
import ReviewForm from '../ReviewForm/ReviewForm';
import StarRating from '../StarRating/StarRating';
import axios from 'axios';

const DescriptionBox = () => {
  const { productId } = useParams(); // Mendapatkan parameter URL productId dari React Router
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Lakukan permintaan HTTP ke endpoint untuk mengambil review
        const response = await axios.get(`http://localhost:4000/reviews/${productId}`);
        const reviewsData = response.data; // Data review dari backend

        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  const addReview = (newReview) => {
    // Implementasi logika untuk menambah review ke database di sini
    console.log("Menambah review:", newReview);
  };

  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box fade">Reviews ({reviews.length})</div>
      </div>
      <div className="descriptionbox-description">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.userId}</strong></p>
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
