import { useState } from 'react';
import API from '../api/axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, email, password });
      alert('Usuario registrado correctamente 🚀');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error(err);
      alert('Error al registrar usuario');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Crear Cuenta Moviliza
      </Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Registrarse
        </Button>
      </Box>
    </Container>
  );
}

export default Register;
