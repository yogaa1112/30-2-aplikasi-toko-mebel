import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DescriptionBox.css';
// import ReviewForm from '../ReviewForm/ReviewForm';
import StarRating from '../StarRating/StarRating';
import axios from 'axios';

const DescriptionBox = () => {
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log(`Fetching reviews for productId: ${productId}`);

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/reviews/${productId}`);
        const reviewsData = response.data;

        console.log('Fetched reviews data:', reviewsData);

        if (Array.isArray(reviewsData)) {
          setReviews(reviewsData);
        } else {
          console.error("Fetched data is not an array:", reviewsData);
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [productId]);

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
    </div>
  );
};

export default DescriptionBox;
