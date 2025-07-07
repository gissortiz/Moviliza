import { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext.jsx';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      alert('Login exitoso 🚀');
    } catch (err) {
      console.error(err);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Iniciar Sesión Moviliza
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Ingresar
        </Button>
      </Box>
    </Container>
  );
}

export default Login;
