import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { CartContext } from '../contexts/CartContext.jsx';
import { Link } from 'react-router-dom';

function Services() {
  const [services, setServices] = useState([]);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get('/services');
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
  }, []);

  const handleAddToCart = (service) => {
    if (!user) {
      alert('Debes iniciar sesión para agregar al carrito.');
      return;
    }

    addToCart({
      id: service._id,
      name: service.name,
      price_data: service.price,
      priceID: service.priceID,  // 👈 si viene de Mongo
      slug: service.slug,
      img: service.imageUrl,
      price: service.price
    });

    alert(`"${service.name}" agregado al carrito 🚀`);
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Servicios Disponibles
      </Typography>
      <Grid
        container
        spacing={3}
        display="flex"
        justifyContent="center"
      >
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service._id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  {service.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  ${service.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/services/${service._id}`}
                >
                  Ver más
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAddToCart(service)}
                >
                  Agregar al carrito
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Services;
