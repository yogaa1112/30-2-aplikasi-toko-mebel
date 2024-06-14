import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ReviewList.css';

const ReviewsList = () => {
  const { productId } = useParams();
  const [orderList, setOrderList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'GET',
        headers: {
          'auth-token': token,
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching orders');
      }
      const orders = await response.json();
      const userId = localStorage.getItem('user-id');
      const userOrders = orders.filter(order => order.userId === userId);
      setOrderList(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:4000/reviews/${productId}`, {
        method: 'GET',
        headers: {
          'auth-token': token,
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching reviews');
      }
      const reviews = await response.json();
      setReviewList(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddReview = async (productId) => {
    // Implement logic to add review
    // Call fetchReviews after adding the review to refresh the list
  };

  const handleEditReview = async (reviewId, newRating, newComment) => {
    // Implement logic to edit review for the specific product
    // Redirect or update review list accordingly
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:4000/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: newRating, comment: newComment }),
      });
      if (!response.ok) {
        throw new Error('Error editing review');
      }
      // Update reviewList state dengan review yang telah diperbarui
      const updatedReview = await response.json();
      setReviewList(prevReviews =>
        prevReviews.map(review => (review._id === reviewId ? updatedReview : review))
      );
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  const handleDeleteReview = async (productId, reviewId) => {
    // Implement logic to delete review for the specific product
    // Update review list accordingly
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:4000/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token,
        },
      });
      if (!response.ok) {
        throw new Error('Error deleting review');
      }
      // Hapus review dari reviewList state
      setReviewList(prevReviews =>
        prevReviews.filter(review => review._id !== reviewId)
      );
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="reviews-list">
      {orderList.map(order => (
        <div key={order._id} className="order-card">
          <h2>Order ID: {order._id}</h2>
          {order.products.map(product => {
            const productReviews = reviewList.filter(review => review.productId === product.id);
            return (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <div className="review-info">
                    {productReviews.length > 0 ? (
                      productReviews.map(review => (
                        <div key={review._id} className="review">
                          <p>Rating: {review.rating}</p>
                          <p>Comment: {review.comment}</p>
                          <div className="review-actions">
                            <button onClick={() => handleEditReview(review.productId)}>Edit Review</button>
                            <button onClick={() => handleDeleteReview(review.productId)}>Delete Review</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Link to={`/reviews/${product.id}`}>
                        <button>Add Review</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
