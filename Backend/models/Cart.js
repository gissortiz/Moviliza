import mongoose from 'mongoose'; 

const cartSchema = new mongoose.Schema({
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
      }
    }
  ]
}, { timestamps: true });


// ✅ Exportación ESM
export default mongoose.model('Cart', cartSchema);
