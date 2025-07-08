import { Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'black',  
        color: '#FFFFFF',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} <strong>Moviliza</strong> — Todos los derechos reservados.
        </Typography>

        <Typography variant="body2">
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener"
            sx={{
              color: '#90CAF9', // Azul claro de contraste
              textDecoration: 'none',
              mx: 1,
              '&:hover': { color: '#BBDEFB' }, // Tonito más claro al pasar
            }}
          >
            Instagram
          </Link>
          |
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener"
            sx={{
              color: '#90CAF9',
              textDecoration: 'none',
              mx: 1,
              '&:hover': { color: '#BBDEFB' },
            }}
          >
            Facebook
          </Link>
          |
          <Link
            href="mailto:contacto@moviliza.cl"
            sx={{
              color: '#90CAF9',
              textDecoration: 'none',
              mx: 1,
              '&:hover': { color: '#BBDEFB' },
            }}
          >
            contacto@moviliza.cl
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
