const Product = require('../model/Product.js'); 
const Users = require('../model/user.js');
const port = 4000;

// Controller untuk menambahkan Item di cart
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

// Controller untuk menghapus item dari cart
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

// Controller untuk menambahkan product
const addProduct = async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if(!userData.isAdmin){
        res.status(401).send({error: "User is not an Admin"})
        return 0;
    }
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

// Controller untuk menghapus produk di database
const removeProduct = async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if(!userData.isAdmin){
        res.status(401).send({error: "User is not an Admin"})
        return 0;
    }
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed")

    res.json({
        success: true,
        name: req.body.name
    });
};

// Controller mengambil semua produk di database
const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("semua Produk diambil")
    res.send(products);
};

// Controller untuk mencari produk yang sesuai yang diketik
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

// Controller untuk mendapatkan koleksi baru
const getNewCollections = async (req, res) => {
    let products = await Product.find({});
    let new_collection = products.slice(1).slice(-8);

    console.log('NewCollection Fetched');
    res.send(new_collection);
};

// Controller untuk mendapatkan produk popular di office
const getPopularInOffice = async (req, res) => {
    let product = await Product.find({ category: "office" });
    let popular_in_office = product.slice(0, 4);

    console.log('Popular in Office fetched');
    res.send(popular_in_office);
};

const UploadIMG = async(req,res)=>{
    let userData = await Users.findOne({ _id: req.user.id });
    if(!userData.isAdmin){
        res.status(401).send({error: "User is not an Admin"})
        return 0;
    }else{
        res.json({
            success : 1,
            image_url : `http://localhost:${port}/images/${req.file.filename}`
        })
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    addProduct,
    removeProduct,
    getAllProducts,
    getNewCollections,
    getPopularInOffice,
    searchProducts,
    UploadIMG,
}