import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import API from '../../../api/axios';
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AuthContext } from '../../../contexts/AuthContext.jsx';
import { CartContext } from '../../../contexts/CartContext.jsx';

import traumaImg from '../../../assets/images/trauma.webp';
import deportivoImg from '../../../assets/images/deportivo.webp';
import adultoMayorImg from '../../../assets/images/adulto_mayor.png';
import evaluacionImg from '../../../assets/images/evaluacion.jpg';

const imagesMap = {
  'trauma.webp': traumaImg,
  'deportivo.webp': deportivoImg,
  'adulto_mayor.png': adultoMayorImg,
  'evaluacion.jpg': evaluacionImg
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

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

  const handleAddToCart = () => {
    if (!user) {
      alert('Debes iniciar sesión para agregar al carrito.');
      return;
    }

    addToCart({
      id: service._id,
      name: service.name,
      price_data: service.price,
      priceID: service.priceID,
      stripeID: service.idService,
      slug: service.slug,
      img: service.imageUrl,
      price: service.price
    });

    alert(`"${service.name}" agregado al carrito 🚀`);
  };

  const handleBack = () => {
    navigate(-1);
  };

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
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Button
        variant="outlined"
        onClick={handleBack}
        sx={{ mb: 5 }}
      >
        ← Volver atrás
      </Button>

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
            height: 250,
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
          <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
            Precio: ${service.price}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ServiceDetail;
