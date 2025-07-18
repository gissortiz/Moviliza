import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { CartContext } from '../contexts/CartContext.jsx';
import Logo from '../assets/images/logo.png'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isAdmin = user?.email === 'admin@moviliza.com';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#0E3359' }}>
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src={Logo}
              alt="Moviliza logo"
              style={{
                height: '40px',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold', color: 'white',
              }}
            >
              Moviliza
            </Typography>
          </Box>


          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/" onClick={handleClose}>Inicio</MenuItem>
              <MenuItem component={Link} to="/services" onClick={handleClose}>Servicios</MenuItem>
              {user ? (
                <>
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>Perfil</MenuItem>
                  {isAdmin && (
                    <MenuItem component={Link} to="/admin/services" onClick={handleClose}>
                      Administración
                    </MenuItem>
                  )}
                  <MenuItem onClick={() => { logout(); handleClose(); }}>Salir</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleClose}>Iniciar sesión</MenuItem>
                  <MenuItem component={Link} to="/register" onClick={handleClose}>Registrarse</MenuItem>
                </>
              )}
              <MenuItem component={Link} to="/cart" onClick={handleClose}>
                <Badge badgeContent={cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button color="inherit" component={Link} to="/">Inicio</Button>
            <Button color="inherit" component={Link} to="/services">Servicios</Button>
            {user ? (
              <>
                <Button color="inherit" component={Link} to="/profile">Perfil</Button>
                {isAdmin && (
                  <Button color="inherit" component={Link} to="/admin/services">Administración</Button>
                )}
                <Button color="inherit" onClick={logout}>Salir</Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">Iniciar sesión</Button>
                <Button color="inherit" component={Link} to="/register">Registrarse</Button>
              </>
            )}
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

