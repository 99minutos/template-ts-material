import { MenuItem, Typography } from '@mui/material';

import { useAuth0Generic } from '@/hooks/auth';

interface IProfileMenuOptionsProps {
  closeMenu: () => void;
}

export const ProfileMenuOptions = (props: IProfileMenuOptionsProps) => {
  const { logout } = useAuth0Generic();
  const { closeMenu } = props;
  return (
    <MenuItem
      onClick={() => {
        closeMenu();
        logout();
      }}
    >
      <Typography textAlign="center">Cerrar Sesión</Typography>
    </MenuItem>
  );
};
