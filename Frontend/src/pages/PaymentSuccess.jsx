import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Container, Typography, Box, Paper, CircularProgress } from '@mui/material';

function PaymentSuccess() {
  const [params] = useSearchParams();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setError('Session ID no encontrado');
        setLoading(false);
        return;
      }

      try {
        const res = await API.get(`/cart/stripe/session/${sessionId}`);
        setResponse(res.data);
      } catch (err) {
        console.error(err);
        setError('No se pudo obtener el recibo');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [params]);

  if (loading) {
    return (
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Cargando recibo...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
        <Typography
          sx={{ mt: 2, cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Typography>
      </Container>
    );
  }

  const formattedAmount = response.stripeSession.amount_total
    ? (response.stripeSession.amount_total).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0
      })
    : '$0';

  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Pago exitoso
        </Typography>
        <Typography variant="body1">
          Cliente: {response.stripeSession.customer_email}
        </Typography>
        <Typography variant="body1">
          Monto total: {formattedAmount}
        </Typography>

        {response.carrito && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Detalles del carrito:
            </Typography>
            {response.carrito.items.map((item, idx) => {
              const formattedDate = item.date
                ? new Date(item.date).toLocaleString('es-CL', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })
                : 'No definida';

              return (
                <Box key={idx} sx={{ my: 1 }}>
                  <Typography>Servicio: {item.service?.name || 'N/A'}</Typography>
                  <Typography>Fecha de reserva: {formattedDate}</Typography>
                  <Typography>Estado: {item.payment_status}</Typography>
                </Box>
              );
            })}
          </>
        )}

        <Typography
          sx={{ mt: 4, cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </Typography>
      </Paper>
    </Container>
  );
}

export default PaymentSuccess;
