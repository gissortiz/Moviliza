import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  idService: {
    type: String,
    required: true,
  },
  priceID: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number
  },
  imageUrl: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
