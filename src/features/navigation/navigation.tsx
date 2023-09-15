import { useNavigate } from '@solidjs/router';
import DraftsIcon from '@suid/icons-material/Drafts';
import InboxIcon from '@suid/icons-material/Inbox';
import LogoutIcon from '@suid/icons-material/Logout';
import MenuIcon from '@suid/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Divider,
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
import { Component, createSignal, Match, Show, Switch } from 'solid-js';
import { useAuth } from '~/features';

const Navigation: Component = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [authState, authActions] = useAuth();
  const [isOpen, setIsOpen] = createSignal(false);
  const toggleDrawer = (open: boolean) => (event: MouseEvent | KeyboardEvent) => {
    if (event.type === 'keydown') {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Tab' || keyboardEvent.key === 'Shift') return;
    }
    setIsOpen(open);
  };
  const showLogin = () => {
    return authActions.isAuthenticated();
  };
  const authLogin = () => {
    navigate('/login');
  };
  const authLogout = () => {
    setIsOpen(false);
    authActions.logout();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GCAPI
            </Typography>
            <Switch>
              <Match when={showLogin() === true}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Match>
              <Match when={showLogin() === false}>
                <Button color="inherit" onClick={() => authLogin()}>
                  Login
                </Button>
              </Match>
            </Switch>
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
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            width: 250,
            height: '100%',
            bgcolor: theme.palette.background.paper
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
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
          <Show when={showLogin() === true}>
            <Divider
              sx={{
                mt: 'auto'
              }}
            />
            <ListItem disablePadding>
              <ListItemButton onClick={() => authLogout()}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItemButton>
            </ListItem>
          </Show>
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
