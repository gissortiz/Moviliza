import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
   <Box
  sx={{
    bgcolor: '#1976d2',
    color: 'white',
    py: 2,
    mt: 'auto' // clave para que flexbox lo empuje abajo
  }}
  component="footer"
>
  <Container maxWidth="md" sx={{ textAlign: 'center' }}>
    <Typography variant="body2">
      © {new Date().getFullYear()} Moviliza - Todos los derechos reservados.
    </Typography>
  </Container>
</Box>
  );
}
