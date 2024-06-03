const Product = require('../model/Product.js'); // Adjust the path to your Product model
const Users = require('../model/user.js'); // Adjust the path to your Users model

// Controller to add item to cart
const addToCart = async (req, res) => {
    console.log("Added", req.body.itemId);

    try {
        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData.cartData) {
            userData.cartData = {};
        }

        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;

        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send('Added');
    } catch (error) {
        res.status(500).send({ errors: "An error occurred while adding to cart" });
    }
};

// Controller to remove item from cart
const removeFromCart = async (req, res) => {
    console.log("Removed", req.body.itemId);

    try {
        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData.cartData) {
            userData.cartData = {};
        }

        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;

            if (userData.cartData[req.body.itemId] === 0) {
                delete userData.cartData[req.body.itemId];
            }

            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send('Deleted');
        } else {
            res.status(400).send({ errors: "Item not found in cart or already at zero quantity" });
        }
    } catch (error) {
        res.status(500).send({ errors: "An error occurred while removing from cart" });
    }
};

// Controller to add product
const addProduct = async (req, res) => {
    let products = await Product.find({});
    let id = 1;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        sub_category: req.body.sub_category,
        price: req.body.price,
    });
    console.log(product);
    await product.save();
    console.log("Saved")

    res.json({
        success: true,
        name: req.body.name,
    });
};

// Controller to remove product
const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed")

    res.json({
        success: true,
        name: req.body.name
    });
};

// Controller to get all products
const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("semua Produk diambil")
    res.send(products);
};

// Controller to search products
const searchProducts = async (req, res) => {
    const query = req.query.query;
    try {
        const results = await Product.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { category: new RegExp(query, 'i') },
                { sub_category: new RegExp(query, 'i') },
            ],
        });
        if (results.length === 0) {
            res.send("No results found");
        } else {
            res.json(results);
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Controller to get new collections
const getNewCollections = async (req, res) => {
    let products = await Product.find({});
    let new_collection = products.slice(1).slice(-8);

    console.log('NewCollection Fetched');
    res.send(new_collection);
};

// Controller to get popular in office products
const getPopularInOffice = async (req, res) => {
    let product = await Product.find({ category: "office" });
    let popular_in_office = product.slice(0, 4);

    console.log('Popular in Office fetched');
    res.send(popular_in_office);
};

module.exports = {
    addToCart,
    removeFromCart,
    addProduct,
    removeProduct,
    getAllProducts,
    getNewCollections,
    getPopularInOffice,
    searchProducts,
}