import Stripe from 'stripe';
import Cart from '../models/Cart.js';
import User from '../models/User.js';

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2024-04-10'
});

export const createCheckoutSession = async (req, res) => {
  try {

    const { user, items, dates } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "Carrito vacío" });
    }

    const foundUser = await User.findById(user.id);
    if (!foundUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const cartItems = items.map(item => ({
      service: item.id,
      quantity: 1,
      priceID: item.priceID,
      date: dates[item.id] || null,
      payment_status: 'pago_pendiente'
    }));


    const cart = new Cart({ user: foundUser._id, items: cartItems });
    await cart.save();

    foundUser.cart = cart._id;
    await foundUser.save();

    const lineItems = items.map(item => ({
      price: item.priceID,
      quantity: 1
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      customer_email: user.email
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};


export const getCart = async (req, res) => {
  try {
    const userID = req.user.id;
    const foundUser = await User.findById(userID);
    const foundCart = await Cart.findById(foundUser.cart);
    res.json({ cart: foundCart });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const editCart = async (req, res) => {
  try {
    const userID = req.user.id;
    const foundUser = await User.findById(userID);
    const { items } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      foundUser.cart,
      { items },
      { new: true }
    );

    res.json({
      msg: "Carrito actualizado",
      cart: updatedCart
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
