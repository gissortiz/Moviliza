import { useContext, useEffect, useState } from 'react';
import API from '../api/axios';
import { AuthContext } from '../contexts/AuthContext.jsx';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';

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

  if (!token)
    return (
      <Container sx={{ mt: 8 }}>
        <Typography variant="h5" align="center">
          No autorizado
        </Typography>
      </Container>
    );

  if (!profile)
    return (
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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card
        elevation={4}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 90,
            height: 90,
            fontSize: 36,
            mb: 2,
          }}
        >
          {profile.name.charAt(0).toUpperCase()}
        </Avatar>

        <Typography variant="h5" gutterBottom align="center">
          Bienvenida/o, {profile.name}!
        </Typography>

        <List sx={{ width: '100%', maxWidth: 360 }}>
          <ListItem>
            <ListItemIcon>
              <PersonIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Nombre: ${profile.name}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={`Email: ${profile.email}`} />
          </ListItem>
        </List>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          align="center"
          sx={{ mt: 2, fontStyle: 'italic' }}
        >
          “El movimiento es vida.”
        </Typography>
        
      </Card>
    </Container>
  );
}

export default Profile;
