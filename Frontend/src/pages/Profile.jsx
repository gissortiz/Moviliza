import { useContext, useEffect, useState } from 'react';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { Container, Typography, CircularProgress, Box } from '@mui/material';

function Profile() {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/auth/profile', {
          headers: { Authorization: token }
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (!token) return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h5">No autorizado</Typography>
    </Container>
  );

  if (!profile) return (
    <Container sx={{ mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
      <Typography align="center" sx={{ mt: 2 }}>
        Cargando perfil...
      </Typography>
    </Container>
  );

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenida/o, {profile.name}!
      </Typography>
      <Typography variant="body1">
        Email: {profile.email}
      </Typography>
    </Container>
  );
}

export default Profile;
