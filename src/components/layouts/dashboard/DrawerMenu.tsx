import { Home } from '@mui/icons-material';
import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const DrawerMenu = () => {
  return (
    <>
      <List component="div">
        <ListItemButton component={NavLink} to="/" sx={{ px: 2.5 }}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>
      </List>
      <Divider />
    </>
  );
};

export default DrawerMenu;
