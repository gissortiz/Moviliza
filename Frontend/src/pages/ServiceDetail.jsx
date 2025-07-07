import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api/axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';

function ServiceDetail() {
  const { id } = useParams(); 
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await API.get(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchService();
  }, [id]);

  if (!service) {
    return (
      <Container sx={{ mt: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Cargando servicio...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        {service.name}
      </Typography>
      <Box
        component="img"
        src={service.imageUrl} 
        alt={service.name}
        sx={{ width: '100%', maxWidth: 600, borderRadius: 2, my: 2 }}
      />
      <Typography variant="body1" sx={{ mb: 2 }}>
        {service.description}
      </Typography>
      <Typography variant="h6" color="primary">
        Precio: ${service.price}
      </Typography>
    </Container>
  );
}

export default ServiceDetail;
