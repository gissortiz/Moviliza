import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext.jsx';
import { AuthContext } from '../contexts/AuthContext.jsx';
import API from '../api/axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box
} from '@mui/material';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [dates, setDates] = useState({});
  const { user } = useContext(AuthContext);
  
  const handleDateChange = (id, value) => {
    setDates({ ...dates, [id]: value });
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    const allSelected = cart.every(item => dates[item.id]);
    if (!allSelected) {
      alert('Selecciona fecha/hora para todos los servicios.');
      return;
    }

    try {
      // 💙 Enviar carrito + fechas si tu back los necesita
      const res = await API.post(
  '/cart/checkout',
  {user: user, items: cart, dates}, 
  {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  }
);

window.location.href = res.data.url;


    } catch (err) {
      console.error(err);
      alert('Error en el checkout');
    }
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography>No hay servicios en el carrito.</Typography>
      ) : (
        <>
          <List>
            {cart.map(item => (
              <ListItem
                key={item.id}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  mb: 2,
                  p: 2
                }}
              >
                <ListItemText
                  primary={item.name}
                  secondary={`Precio: $${item.price}`}
                />
                <TextField
                  type="datetime-local"
                  label="Fecha y hora"
                  InputLabelProps={{ shrink: true }}
                  value={dates[item.id] || ''}
                  onChange={(e) =>
                    handleDateChange(item.id, e.target.value)
                  }
                  sx={{ mt: 1, mb: 1, width: '100%' }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${total}
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
            >
              Vaciar carrito
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Pagar ahora
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default Cart;
