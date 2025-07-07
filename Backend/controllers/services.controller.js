import Service from '../models/Service.js';
import Stripe from 'stripe';

console.log("STRIPE_KEY:", process.env.STRIPE_KEY); 

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2024-04-10',
});

export const createService = async (req, res) => {
  const { name, description, price, duration, imageUrl, currency, slug } = req.body;

  try {
    // 1) Crear producto en Stripe
    const product = await stripe.products.create({
      name,
      description,
      images: [imageUrl],
      metadata: { duration: String(duration), slug }
    });

    // 2) Crear precio asociado en Stripe (unit_amount SIEMPRE en centavos)
    const stripePrice = await stripe.prices.create({
      unit_amount: price * 100, // 💡 CLAVE: Stripe trabaja en centavos
      currency,
      product: product.id
    });

    // 3) Guardar en MongoDB
    const newService = new Service({
      name,
      description,
      price,
      duration,
      imageUrl,
      currency,
      slug,
      idService: product.id,   // ID de producto en Stripe
      priceID: stripePrice.id  // ID de precio en Stripe
    });

    await newService.save();

    res.status(201).json(newService);

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// ================================
// Obtener todos los servicios
// ================================
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================================
// Obtener servicio por ID
// ================================
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Servicio no encontrado' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================================
// Actualizar servicio
// ================================
export const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: 'Servicio no encontrado' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================================
// Eliminar servicio
// ================================
export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: 'Servicio no encontrado' });
    res.json({ msg: 'Servicio eliminado' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
