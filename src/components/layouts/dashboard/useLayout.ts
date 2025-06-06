import { useCallback, useState } from 'react';

const useLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [handle_el, setAnchorEl] = useState<null | any>(null);

  const toggleDrawer = useCallback(() => setOpenDrawer(!openDrawer), [openDrawer]);

  const handleOpenUserMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return {
    handle_el,
    openDrawer,
    handleOpenUserMenu,
    handleCloseUserMenu,
    toggleDrawer,
  };
};

export default useLayout;
