import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ReviewList.css';

const ReviewList = () => {
  const { productId } = useParams();
  const [orderList, setOrderList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    console.log("Fetched productId from URL:", productId); // Log productId
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orderList.length > 0 && productId) {
      fetchReviews(productId);
    }
  }, [orderList, productId]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('https://api-msib-6-toko-mebel-02.educalab.id/api/orders', {
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
      console.log("User orders:", userOrders); // Log order data
      setOrderList(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const response = await fetch(`https://api-msib-6-toko-mebel-02.educalab.id/reviews/${productId}`);
      if (!response.ok) {
        throw new Error('Error fetching reviews');
      }
      const reviews = await response.json();
      console.log("Fetched reviews:", reviews); // Log review data
      setReviewList(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleEditReview = async (reviewId, newRating, newComment) => {
    try {
      const token = localStorage.getItem('auth-token');
      const userId = localStorage.getItem('user-id');

      const response = await fetch(`https://api-msib-6-toko-mebel-02.educalab.id/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, rating: newRating, comment: newComment }),
      });

      if (!response.ok) {
        throw new Error('Error editing review');
      }

      const updatedReview = await response.json();
      setReviewList(prevReviews =>
        prevReviews.map(review => (review._id === reviewId ? updatedReview : review))
      );
    } catch (error) {
      console.error('Error editing review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem('auth-token');

      const response = await fetch(`https://api-msib-6-toko-mebel-02.educalab.id/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Error deleting review');
      }

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
            const productReviews = reviewList.filter(review => review.productId === productId); // Gunakan == untuk perbandingan tipe yang berbeda
            console.log(`Product ID ${productId} has reviews:`, productReviews); // Log product reviews
            return (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Price: Rp {product.price}</p>
                  <div className="review-info">
                    {productReviews.length > 0 ? (
                      productReviews.map(review => (
                        <div key={review._id} className="review">
                          <p>Rating: {review.rating}</p>
                          <p>Comment: {review.comment}</p>
                          <div className="review-actions">
                            <button onClick={() => handleEditReview(review._id, review.rating, review.comment)}>Edit Review</button>
                            <button onClick={() => handleDeleteReview(review._id)}>Delete Review</button>
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

export default ReviewList;
