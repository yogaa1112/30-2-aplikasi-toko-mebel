const Review = require('../model/Review');

// Create a new review
exports.createReview = async (req, res) => {
    const { name, rating, comment } = req.body;

    try {
        const newReview = new Review({ name, rating, comment });
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error });
    }
};

// Get all reviews
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};
