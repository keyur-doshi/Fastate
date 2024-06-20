const Cart = require("../models/Cart");

const getCartByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
        const result = await Cart.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addToCart = async (req, res) => {
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
    try {
        const existingCartItem = await Cart.findOne({ menuItemId });
        if (existingCartItem) {
            return res.status(400).json({ message: "Item already exists in cart!" });
        }
        const cartItem = await Cart.create({
            menuItemId, name, recipe, image, price, quantity, email
        });
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        if (!deletedCart) {
            return res.status(401).json({ message: "No such item in the cart!" });
        }
        res.status(200).json({ message: "Cart item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId, { menuItemId, name, recipe, image, price, quantity, email }, {
            new: true, runValidators: true
        }
        )
        if (!updatedCart) {
            return res.status(404).json({ message: "No such item in the cart!" });
        }
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const cartItem = await Cart.findById(cartId);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getCartByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart
}