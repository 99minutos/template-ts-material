import { Email, Home, Person } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';

const TopMenu = () => {
  return (
    <>
      <Tooltip title="Inicio">
        <IconButton size="large" component={NavLink} to="/">
          <Home />
        </IconButton>
      </Tooltip>
      <Tooltip title="Personal">
        <IconButton size="large" component={NavLink} to="/personal">
          <Person />
        </IconButton>
      </Tooltip>
      <Tooltip title="Correo">
        <IconButton size="large" component={NavLink} to="/email">
          <Email />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default TopMenu;
