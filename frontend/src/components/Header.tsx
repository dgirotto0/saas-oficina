import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { useThemeMode } from './ThemeModeProvider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAuth } from './AuthProvider';

const Header: React.FC = () => {
  const { token, setToken } = useAuth();
  const { mode, toggleMode } = useThemeMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setToken(null);
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 3 }}>
      <Toolbar>
        <Link href="/" passHref>
          <Typography variant="h6" sx={{ cursor: 'pointer', flexGrow: 1 }}>
            SaaS Oficina
          </Typography>
        </Link>
        <IconButton color="inherit" onClick={toggleMode}>
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        {token ? (
          <>
            <IconButton onClick={handleAvatarClick} sx={{ ml: 2 }}>
              <Avatar alt="Usuário" src="/static/images/avatar/1.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link href="/dashboard">Dashboard</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </>
        ) : (
          <Link href="/login" passHref>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
