import { Avatar, Box, IconButton, Menu, Toolbar, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

import logo from '@/assets/logo.svg';
import { useAuth0Generic } from '@/hooks/auth';
import { stringAvatar, stringToColor } from '@/utils/strings';

import { AppBar as genAppBar } from '../dependencies';
import { ProfileMenuOptions } from './ProfileMenuOptions';
import TopMenu from './TopMenu';
import useLayout from './useLayout';

const drawerWidth = 250;

const AppBar = genAppBar(drawerWidth);

export default function DashboardTopLayout(props: PropsWithChildren) {
  const { handle_el, handleOpenUserMenu, handleCloseUserMenu } = useLayout();

  const { name } = useAuth0Generic();
  return (
    <div className="min-h-screen flex flex-col overflow-y-none">
      <AppBar
        color="inherit"
        position="relative"
        elevation={0}
        variant="outlined"
        sx={{ borderLeft: 'none', borderTop: 'none' }}
      >
        <Toolbar>
          <img src={logo} style={{ maxHeight: 38 }} alt="99Minutos logo" />
          <Typography ml={1} color="#072146" fontWeight="bold">
            Application dashboard
          </Typography>

          <Box sx={{ marginLeft: 2, marginRight: 'auto' }} className="top-menu">
            <TopMenu />
          </Box>
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
      <div className="flex flex-grow overflow-y-auto">
        <main className="relative flex-1 transition-all duration-300 h-[calc(100vh-4rem)]">
          {props.children}
        </main>
      </div>
    </div>
  );
}
