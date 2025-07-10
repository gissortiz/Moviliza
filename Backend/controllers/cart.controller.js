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
      customer_email: user.email,
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      currency: 'clp'
    });

    res.json({ url: session.url });

  } catch (err) {
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


export const getStripeSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.id);

    let carrito = null;

    if (session.payment_status === 'paid') {
      const foundUser = await User.findOne({ email: session.customer_email }).populate({
        path: 'cart',
        populate: { path: 'items.service' }
      });

      if (foundUser && foundUser.cart) {
        foundUser.cart.items.forEach(item => {
          if (item.payment_status === 'pago_pendiente') {
            item.payment_status = 'pago_exitoso';
          }
        });

        // 🚩 Forzar que Mongoose guarde cambios del array
        foundUser.cart.markModified('items');

        await foundUser.cart.save();

        carrito = foundUser.cart;
      }
    } else {
      console.log('ℹPago no completado, no se actualiza carrito');
    }

    res.json({
      stripeSession: session,
      carrito: carrito
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


