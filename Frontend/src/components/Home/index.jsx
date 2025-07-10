import { Box, Button, Container, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Slider from "react-slick";


const Home = () => {

  const infoCards = [
    {
      title: 'Kinesiología deportiva y traumatológica',
      text: 'Recupera tu rendimiento y calidad de vida con terapias especializadas para lesiones deportivas y traumatológicas'
    },
    {
      title: 'Planes de prevención y recuperación de lesiones',
      text: 'Te acompañamos en tu recuperación integral y prevenimos lesiones para que sigas activo y sin limitaciones.'
    },
    {
      title: 'Talleres de adulto mayor',
      text: 'Sesiones grupales para mantener funcionalidad, equilibrio y bienestar en la tercera edad.'
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Cambia a 2 si quieres ver 2 cards en desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: '#0D47A1', fontWeight: 'bold' }}>
        Bienvenido a Moviliza
      </Typography>

      <Typography variant="h6" align="center" sx={{ mb: 1, color: '#424242' }}>
        Centro Integral de Rehabilitación y Movimiento.
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 4, maxWidth: 600, mx: 'auto', color: '#555' }}>
        “Rehabilita, previene y alcanza tu máximo potencial.”
      </Typography>

      <Box
        component="img"
        src="https://www.sumar.cl/src_tienda/gallery/14712/kinesiologia.jpg"
        alt="Moviliza Hero"
        sx={{
          width: '100%',
          height: { xs: 200, sm: 350, md: 450 },
          objectFit: 'cover',
          borderRadius: 3,
          boxShadow: 4,
          mb: 4
        }}
      />

      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/services/686e9f8a9b24fd3d63315ce0"
        sx={{
          display: 'block',
          mx: 'auto',
          mb: 4,
          backgroundColor: '#1976D2',
          '&:hover': { backgroundColor: '#1565C0' },
          color: '#fff',
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: 3,
          px: 4,
          py: 1.5,
          boxShadow: 3,
          textAlign: 'center',
          width: 'fit-content'
        }}
      >
        Reserva tu evaluación inicial
      </Button>

      <Typography variant="body1" align="center" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
        Cada mes compartimos consejos y novedades para acompañar tu bienestar.
        ¡Mantente informado con nuestras recomendaciones!
      </Typography>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Slider {...settings}>
          {infoCards.map((card, index) => (
            <Box key={index} px={2}>
              <Card
                sx={{
                  padding: 5,
                  margin: 5,
                  width: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: 3,
                  boxShadow: 4,
                  backgroundColor: '#E3F2FD'
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: '#1976D2', fontWeight: 'bold' }}
                  >
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: '#333' }}>
                    {card.text}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
};

export default Home;
