import Service from '../models/Service.js';
import Stripe from 'stripe';

console.log("STRIPE_KEY:", process.env.STRIPE_KEY);

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2024-04-10',
});

export const createService = async (req, res) => {
  const { name, description, price, duration, imageUrl, currency = "CLP", slug } = req.body;

  try {
    const product = await stripe.products.create({
      name,
      description,
      images: [imageUrl],
      metadata: { duration: String(duration), slug: name }
    });

    const stripePrice = await stripe.prices.create({
      unit_amount: price,
      currency,
      product: product.id
    });

    const newService = new Service({
      name,
      description,
      price,
      duration,
      imageUrl,
      currency,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      idService: product.id,
      priceID: stripePrice.id
    });

    await newService.save();

    res.status(201).json(newService);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Servicio no encontrado' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Servicio no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Servicio no encontrado' });

    await stripe.products.update(service.idService, { active: false });
    await stripe.prices.update(service.priceID, { active: false });

    await Service.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Servicio eliminado de MongoDB y desactivado en Stripe' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};
