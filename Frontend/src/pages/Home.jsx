import { Box, Button, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Container sx={{ my: 8 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Bienvenido a Moviliza
            </Typography>
            <Typography variant="h6" align="center" sx={{ mb: 4 }}>
                Kinesiología y bienestar directamente a tu hogar
            </Typography>

            <Box
                component="img"
                src="https://www.sumar.cl/src_tienda/gallery/14712/kinesiologia.jpg"
                alt="Moviliza Hero"
                sx={{
                    width: '100%',
                    height: { xs: 200, sm: 300, md: 400 },
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 4
                }}
            />

            <Button
                variant="contained"
                size="large"
                component={Link}
                to="/services"
                sx={{ display: 'block', mx: 'auto', mb: 6, textAlign: 'center' }}
            >
                Reserva tu sesión ahora
            </Button>

            <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 2, height: '100%', boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Atención Personalizada
                            </Typography>
                            <Typography>
                                Tratamientos adaptados a tus necesidades.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 2, height: '100%', boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Profesionales Calificados
                            </Typography>
                            <Typography>
                                Equipo especializado y certificado.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ p: 2, height: '100%', boxShadow: 3, borderRadius: 2, textAlign: 'center' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Comodidad en tu Hogar
                            </Typography>
                            <Typography>
                                Sesiones en la comodidad de tu domicilio.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Container>
    );
}
