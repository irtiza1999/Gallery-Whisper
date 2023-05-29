import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useGetCategoryQuery } from '../slices/productsApiSlice';
import Loader from './Loader';
import CartIcon from './CartIcon';
import { deepPurple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {setCredentials} from '../slices/authSlice';


const Header = () => {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };
  const { data: categories, isLoading, isError, error } = useGetCategoryQuery();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {{
    setCartCount(cartItems.length);
  }}, [cartItems]);

  return (
    <div style={{ marginBottom: '30px' }}>
      <AppBar position="fixed" style={{ background: 'black' }}>
        
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LinkContainer to="/">
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
            </LinkContainer>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {isLoading ? (
                  <Loader />
                ) : error ? (
                  <Loader />
                ) : (
                  <>
                    {categories.map((category) => (
                      <LinkContainer to={`/${category}`}>
                        <MenuItem key={category} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{category.toUpperCase()}</Typography>
                        </MenuItem>
                      </LinkContainer>
                    ))}
                  </>
                )}
              </Menu>
            </Box>
            <LinkContainer to="/">
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Typography textAlign="center">LOGO</Typography>
              </Typography>
            </LinkContainer>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Loader />
              ) : (
                <>
                  {Array.isArray(categories) &&
                    categories.map((category) => (
                      <LinkContainer key={category} to={`/${category}`}>
                        <Button
                          key={category}
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {category.toUpperCase()}
                        </Button>
                      </LinkContainer>
                    ))}
                </>
              )}
            </Box>
            <div style={{ marginRight: '10px' }}>
            <Link to="/cart" style={{ color: 'white' }}>
                <CartIcon itemCount={cartCount} />
            </Link>
              </div>
            {userInfo ? (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={userInfo.name.toUpperCase()}
                        sx={{ bgcolor: deepPurple[500] }}
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <LinkContainer to = {`/favorites/${userInfo._id}`}>
                      <MenuItem key='fav'>
                        <Typography textAlign="center">My Favorites</Typography>
                      </MenuItem>
                    </LinkContainer>

                    <LinkContainer to="/profile">
                      <MenuItem key={userInfo.name}>
                        <Typography textAlign="center">Update Profile</Typography>
                      </MenuItem>
                    </LinkContainer>

                    <MenuItem onClick={logoutHandler}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <LinkContainer to="/register" className="mx-2">
                  <Button variant="contained">Register</Button>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Button variant="contained" color="success">
                    Login
                  </Button>
                </LinkContainer>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
