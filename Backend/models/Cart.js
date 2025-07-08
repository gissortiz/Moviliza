import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      priceID: String,
      date: String,
      payment_status: {
        type: String,
        enum: ['pago_pendiente', 'pago_exitoso', 'pago_rechazado'],
        default: 'pago_pendiente'
      }
    }
  ]
}, { timestamps: true });


export default mongoose.model('Cart', cartSchema);
