import { useAuth0 } from '@auth0/auth0-react';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { PropsWithChildren } from 'react';

import logo from '@/assets/logo.svg';
import { stringAvatar, stringToColor } from '@/utils/strings';

import useSimpleLayout from './useSimpleLayout';

export function SimpleLayout(props: PropsWithChildren) {
  const { user, logout } = useAuth0();
  const { handle_el, handleOpenUserMenu, handleCloseUserMenu } = useSimpleLayout();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: 'background.paper',
            boxShadow: 0,
            borderBottom: '1px solid',
            borderColor: 'grey.300',
            padding: { xs: 0, md: '0px 20px' },
          }}
        >
          <img src={logo} style={{ maxHeight: 38 }} alt="99Minutos logo" />
          <Box sx={{ marginLeft: 2, marginRight: 'auto' }}></Box>
          <>
            {user?.name && (
              <>
                <Typography
                  noWrap
                  fontWeight="bold"
                  color="primary"
                  component="div"
                  sx={{ marginRight: 1 }}
                >
                  {user.name}
                </Typography>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    color="primary"
                    sx={{
                      bgcolor: stringToColor(user.name || ''),
                    }}
                  >
                    {stringAvatar(user.name || '')}
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
                  <ProfileMenuOptions closeMenu={handleCloseUserMenu} logout={logout} />
                </Menu>
              </>
            )}
          </>
        </Toolbar>
      </AppBar>
      <main
        style={{
          flex: 1,
          flexGrow: 1,
          overflowY: 'auto',
          backgroundColor: '#FAFAFA',
          height: 'calc(100vh - 64px)',
        }}
        className="p-4"
      >
        {props.children}
      </main>
    </Box>
  );
}

interface IProfileMenuOptionsProps {
  logout: () => void;
  closeMenu: () => void;
}

const ProfileMenuOptions = (props: IProfileMenuOptionsProps) => {
  const { closeMenu } = props;
  return (
    <MenuItem
      onClick={() => {
        closeMenu();
        props.logout();
      }}
    >
      <Typography textAlign="center">Cerrar Sesión</Typography>
    </MenuItem>
  );
};
