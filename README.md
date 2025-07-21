# 🌐 Demo: https://moviliza-1.onrender.com/
# 💪 Moviliza — Centro Integral de Kinesiología y Rehabilitación

Moviliza es una aplicación web diseñada para gestionar reservas de servicios de kinesiología, talleres y atención integral, conectando pacientes con profesionales de forma sencilla, segura y eficaz.

# 🚀 Tecnologías Utilizadas

## Frontend

- React + Vite
- MUI (Material UI) para la interfaz
- React Router DOM para ruteo
- Axios para consumo de API REST
- useContext para manejo de estado global (Auth y Cart)

## Backend

- Node.js + Express
- MongoDB con Mongoose
- JWT para autenticación
- bcryptjs para encriptar contraseñas
- Stripe para pagos en línea
- dotenv, cors, nodemon

# ⚙️ Características Implementadas

✅ Registro y login de usuarios con JWT  
✅ Carrito de compras persistente con useContext y localStorage  
✅ Creación de sesiones de pago seguras con Stripe Checkout  
✅ Gestión de servicios:  

 - CRUD de servicios con integración a Stripe Products/Prices  
 - Desactivación de productos en Stripe y MongoDB al eliminar  
 
✅ Detalle de servicio con imágenes desde carpeta local (src/assets/images)  
✅ Perfil de usuario protegido con middleware de verificación de token  
✅ Rutas privadas para admin, sólo accesibles por admin@moviliza.com  
✅ Dashboard de administración para agregar y eliminar servicios  

# 🗄️ Estructura de Base de Datos

## 📦 Usuarios (User)

```js
{
  name: String,
  email: String,
  password: String, // hashed
  cart: ObjectId // referencia a Cart
}
```

## 🛒 Carrito (Cart)

```js
{
  user: ObjectId, // referencia a User
  items: [
    {
      service: ObjectId, // referencia a Service
      quantity: Number,
      priceID: String,      // Stripe Price ID
      date: String,         // Fecha y hora de reserva
      payment_status: String // 'pago_pendiente' | 'pago_exitoso' | 'pago_rechazado'
    }
  ],
  createdAt: Date,         // Fecha de creación (auto)
  updatedAt: Date          // Fecha de actualización (auto)
}
```

## 📝 Servicios (Service)

```js
{
  name: String,
  description: String,
  price: Number,
  duration: String,
  imageUrl: String,
  slug: String,
  idService: String, // Stripe Product ID
  priceID: String    // Stripe Price ID
}
```

# 🔑 Flujo Principal

1️⃣ El usuario se registra o inicia sesión → Se genera un JWT → Se guarda en LocalStorage.  
2️⃣ Puede explorar servicios y agregarlos al carrito → CartContext maneja la persistencia.  
3️⃣ En el checkout:  

- Se guarda la reserva en el modelo Cart con referencia al usuario.  
- Se crea la sesión de pago en Stripe usando priceID desde el catálogo.  
- El usuario paga y es redirigido según éxito o cancelación.  

4️⃣ Admin: El usuario admin@moviliza.com puede agregar, editar y eliminar servicios, sincronizando con Stripe.  

# 🎨 Detalles UI/UX

✅ Paleta de colores: tonos de azul y gris  
✅ Cards responsivas y uniformes  
✅ Footer fijo al final de la página  
✅ Navbar adaptable con badge de carrito  
✅ Validación básica de formularios  

# 🗂️ Comandos

## Backend
npm run dev

## Frontend
npm run dev

# Desarrollado por

Gissella — Proyecto Bootcamp FullStack 2025
