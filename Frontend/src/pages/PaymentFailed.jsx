import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Alert } from '@mui/material';

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Alert severity="error" sx={{ mb: 4 }}>
        Hubo un problema al procesar tu pago. 😥
      </Alert>
      <Typography variant="h6">
        Intenta nuevamente o contáctanos si el problema persiste.
      </Typography>
      <Typography sx={{ mt: 4 }}>
        Serás redirigido al inicio en unos segundos...
      </Typography>
    </Container>
  );
};

export default PaymentFailed;
