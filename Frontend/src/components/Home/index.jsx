import { Box, Button, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
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
        to="/services"
        sx={{
          display: 'block',
          mx: 'auto',
          mb: 4,
          backgroundColor: '#1976D2',
          '&:hover': {
            backgroundColor: '#1565C0',
          },
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

      <Grid
        container spacing={4}
        justifyContent="center"
        display="block"
      >
        {[
          {
            title: 'Kinesiología deportiva y traumatológica',
            text: 'Recupera tu rendimiento y calidad de vida con terapias especializadas para lesiones deportivas y traumatológicas'
          },
          {
            title: 'Planes de prevención y recuperación de lesiones',
            text: ' Te acompañamos en tu recuperación integral y prevenimos lesiones para que sigas activo y sin limitaciones.'
          },
          {
            title: 'Talleres de adulto mayor',
            text: 'Sesiones grupales para mantener funcionalidad, equilibrio y bienestar en la tercera edad.'
          },
        ].map((card, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{ display: 'flex' }}
          >
            <Card
              sx={{
                p: 3,
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: 4,
                backgroundColor: '#E3F2FD',
                margin: '10px'
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
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
