import React, { useContext } from 'react';
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext, anonymousUser } from './AuthContext';

interface AuthHeaderProps {
    onLogin(): void;
    onLogout(): void;
}

export function AppHeader({onLogin, onLogout}: AuthHeaderProps) {
    
    return(      <AppBar position='static'>
        <Toolbar>
          <LiveTvOutlinedIcon sx={{ mr: 2 }} />
          <Typography
            variant='h6'
            color="inherit"
            noWrap
          >
            MOVIES PLANET
            </Typography>
            <Box sx={{flexGrow: 1}}>
                <nav>
                    <HeaderLink to="/">Home</HeaderLink>
                    <HeaderLink to="/movies">Movies</HeaderLink>
                    <HeaderLink to="/about">About</HeaderLink>
                </nav>
            </Box>

            <AuthSection onLogin={onLogin} onLogout={onLogout} />
        </Toolbar>
    </AppBar>
    )
}

interface AuthSectionProps {
    onLogin(): void;
    onLogout(): void;
}

function AuthSection({onLogin, onLogout}: AuthSectionProps) {
    const {user} = useContext(AuthContext);
    const loggedIn = user !== anonymousUser;
    
    if (loggedIn) {
        return (
            <>
                <Typography>Hello, {user.name}!</Typography>
                <Button color="inherit" variant="outlined" sx={{ ml: 1.5 }} onClick={onLogout}>
                    Log out
                </Button>
            </>
        )
    }
    return (
        <Button color="inherit" variant="outlined" onClick={onLogin}>
            Log in
        </Button>
    );
}

function HeaderLink({children, to}: { to: string, children: React. ReactNode })
{
  return (
    <Link
      component={RouterLink}
      to={to}
      variant='button'
      color="inherit"
      sx={{my: 1, mx: 1.5}}
    >
      {children}
    </Link>)
}
