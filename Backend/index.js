import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from './routes/services.routes.js';
//import reservationRoutes from './routes/reservations.routes.js';
// Importar rutas de carrito
import cartRoutes from './routes/cart.routes.js';



const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
//app.use('/api/reservations', reservationRoutes);

// Usar rutas de carrito  
app.use('/api/cart', cartRoutes);

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("API Moviliza funcionando! 🚀");
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error(err));

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
