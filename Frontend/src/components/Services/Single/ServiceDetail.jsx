import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../../../api/axios';
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';

import traumaImg from '../../../assets/images/trauma.webp';
import deportivoImg from '../../../assets/images/deportivo.webp';
import adultoMayorImg from '../../../assets/images/adulto_mayor.png';

const imagesMap = {
  'trauma.webp': traumaImg,
  'deportivo.webp': deportivoImg,
  'adulto_mayor.png': adultoMayorImg
};

const ServiceDetail = () => {
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
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>
          Cargando servicio...
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 8,
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          boxShadow: 4,
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <CardMedia
          component="img"
          image={imagesMap[service.imageUrl]}
          alt={service.name}
          sx={{
            height: 300,
            objectFit: 'cover'
          }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {service.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {service.description}
          </Typography>
          <Typography variant="h6" color="primary">
            Precio: ${service.price}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ServiceDetail;
