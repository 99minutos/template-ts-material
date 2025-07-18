import { useState } from 'react';

const useLayout = () => {
  const [handle_el, setAnchorEl] = useState<null | any>(null);

  const handleOpenUserMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return {
    handle_el,
    handleOpenUserMenu,
    handleCloseUserMenu,
  };
};

export default useLayout;
