import { useEffect, useState } from 'react';
import API from '../../../api/axios.js';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Services = () => {
  const [services, setServices] = useState([]);

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

  return (
    <Container
      sx={{
        my: 4,
        borderRadius: 2,
        p: 4
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h4" sx={{ color: '#424242', fontWeight: 'bold' }}>
            Servicios Disponibles
          </Typography>
          <Typography variant="body2" sx={{ color: '#616161' }}>
            Elige tu sesión de kinesiología y mejora tu bienestar hoy mismo.
          </Typography>
        </CardContent>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>
            <Card
              sx={{
                maxWidth: 400,
                height: 200,
                width: 200,
                padding: 4,
                margin: 4,
                display: 'block',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
                boxShadow: 4,
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
                backgroundColor: '#fff'
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#424242' }}>
                  {service.name}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#0E3359', fontWeight: 'bold' }}>
                  ${service.price}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
                <Button
                  size="small"
                  variant="outlined"
                  component={Link}
                  to={`/services/${service._id}`}
                  startIcon={<InfoOutlinedIcon />}
                  sx={{ borderColor: '#0E3359', color: '#0E3359' }}
                >
                  Ver más
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Services;
