import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  styled,
  Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface IItemListProps {
  openDrawer: boolean;
  label: string;
  icon: any;
  url: string;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = (drawerWidth: number) =>
  styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

const Drawer = (drawerWidth: number, openedMixin: any, closedMixin: any) =>
  styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));

const ItemList = (props: IItemListProps) => {
  const { openDrawer, label, icon, url } = props;

  return (
    <Link to={url}>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: openDrawer ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <Tooltip title={label} placement="right">
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openDrawer ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {icon}
            </ListItemIcon>
          </Tooltip>

          <ListItemText primary={label} sx={{ opacity: openDrawer ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export { AppBar, Drawer, DrawerHeader, ItemList };
