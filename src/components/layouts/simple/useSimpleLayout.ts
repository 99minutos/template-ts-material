import { useCallback, useState } from 'react';

export default function useSimpleLayout() {
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
}
