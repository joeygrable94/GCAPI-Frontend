import DraftsIcon from '@suid/icons-material/Drafts';
import InboxIcon from '@suid/icons-material/Inbox';
import MenuIcon from '@suid/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@suid/material';
import useTheme from '@suid/material/styles/useTheme';
import { Component, createSignal, onMount } from 'solid-js';
import { useNavigate } from 'solid-start';
import { log } from '~/features';

const Navigation: Component = () => {
  // navigation
  const navigate = useNavigate();
  // theme state
  const theme = useTheme();
  const [isOpen, setIsOpen] = createSignal(false);
  // theme actions
  const toggleDrawer = (open: boolean) => (event: MouseEvent | KeyboardEvent) => {
    if (event.type === 'keydown') {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Tab' || keyboardEvent.key === 'Shift') return;
    }
    setIsOpen(open);
  };
  // auth state
  // const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  // auth actions
  const authLogin = () => {
    console.log('login');
  };
  const authLogout = () => {
    console.log('logout');
  };

  onMount(() => {
    log('Navigation', 'mounted');
    // log(isAuthenticated());
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GCAPI
            </Typography>
            <Button color="inherit" onClick={() => authLogin()}>
              Login
            </Button>
            <Button color="inherit" onClick={() => authLogout()}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* Drawer */}
      <Drawer
        anchor="left"
        open={isOpen()}
        sx={{ zIndex: 9999 }}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250, bgcolor: theme.palette.background.paper }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate('/about')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary={'About'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navigation;
