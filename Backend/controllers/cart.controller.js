import Stripe from 'stripe'; // ✅ ES Module compatible
import Cart from '../models/Cart.js';
import User from '../models/User.js';

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2024-04-10'
});

// Esta función crea una sesión de pago en Stripe
// y devuelve la URL a la que el usuario debe ser redirigido para completar el pago.
export const createCheckoutSession = async (req, res) => {
  try {
    console.log("Body recibido:", req.body);

    const { user, items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ msg: "Carrito vacío" });
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'clp',
        product_data: {
          name: item.name,
          images: [item.img]
        },
        unit_amount: item.price
      },
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
