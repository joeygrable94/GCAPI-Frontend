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
import { Component, createSignal, Match, Switch } from 'solid-js';
import { useNavigate } from 'solid-start';

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
  // const auth = useAuth0();
  // auth actions
  const showLogin = () => {
    return false;
  };
  const authLogin = () => {
    console.log('login');
    // auth?.loginWithRedirect();
  };
  const authLogout = () => {
    console.log('logout');
    // auth?.logout();
  };
  // onMount(() => log(auth?.isAuthenticated()));

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
            <Switch>
              <Match when={showLogin()}>
                <Button color="inherit" onClick={() => authLogout()}>
                  Logout
                </Button>
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
