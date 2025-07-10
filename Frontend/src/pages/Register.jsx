import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext.jsx';
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
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { name, email, password });
      // Login automático tras registro
      const res = await API.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      setName('');
      setEmail('');
      setPassword('');
      navigate('/');
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
