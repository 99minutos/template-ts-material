import { ChevronLeft, Menu as MenuIcon } from '@mui/icons-material';
import { Avatar, Box, Divider, IconButton, Menu, Toolbar, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import logo from '@/assets/logo.svg';
import { useAuth0Generic } from '@/hooks/auth';
import { stringAvatar, stringToColor } from '@/utils/strings';

import { DrawerHeader, AppBar as genAppBar, Drawer as genDrawer } from './dependencies';
import DrawerMenu from './DrawerMenu';
import { genClosedMixin, genOpenedMixin } from './mixing';
import { ProfileMenuOptions } from './ProfileMenuOptions';
import useLayout from './useLayout';

const drawerWidth = 250;
const openedMixin = genOpenedMixin(drawerWidth);
const closedMixin = genClosedMixin();

const AppBar = genAppBar(drawerWidth);
const Drawer = genDrawer(drawerWidth, openedMixin, closedMixin);

export default function DashboardLayout(props: PropsWithChildren) {
  const { handle_el, openDrawer, handleOpenUserMenu, handleCloseUserMenu, toggleDrawer } =
    useLayout();

  const { name } = useAuth0Generic();
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        color="inherit"
        position="fixed"
        elevation={0}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        open={openDrawer}
        variant="outlined"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{
              marginRight: 5,
              ...(openDrawer && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} style={{ maxHeight: 38 }} alt="99Minutos logo" />
          <Typography ml={1} color="#072146" fontWeight="bold">
            Brand here
          </Typography>

          <Box sx={{ marginLeft: 2, marginRight: 'auto' }}></Box>
          {name && (
            <>
              <Typography
                noWrap
                fontWeight="bold"
                color="primary"
                component="div"
                sx={{ marginRight: 1 }}
              >
                {name}
              </Typography>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  color="primary"
                  sx={{
                    bgcolor: stringToColor(name || ''),
                  }}
                >
                  {stringAvatar(name || '')}
                </Avatar>
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={handle_el}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!handle_el}
                onClose={handleCloseUserMenu}
              >
                <ProfileMenuOptions closeMenu={handleCloseUserMenu} />
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={openDrawer}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerMenu />
      </Drawer>
      <main
        style={{
          flex: 1,
          flexGrow: 1,
          overflowY: 'auto',
          paddingTop: 'calc(64px)',
          backgroundColor: '#FAFAFA',
          height: 'calc(100vh)',
        }}
      >
        {props.children}
      </main>
    </Box>
  );
}
