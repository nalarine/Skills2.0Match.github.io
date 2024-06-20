import React, { useState } from 'react';
import HeaderTop from './HeaderTop';
import SidebarAdm from './Sidebar';

const AdLayout = (Component) => (props) => {
  const [openNav, setOpenNav] = useState(false);

  const handleOpenNav = () => {
    console.log("Opening Nav");
    setOpenNav(true);
  };

  const handleCloseNav = () => {
    console.log("Closing Nav");
    setOpenNav(false);
  };

  return (
    <div className="flex min-h-screen">
      <SidebarAdm openNav={openNav} onCloseNav={handleCloseNav} />
      <div className="w-full bg-gray-200">
        <HeaderTop onOpenNav={handleOpenNav} />
        <div className="p-3">
          <Component {...props} />
        </div>
      </div>
    </div>
  );
};

export default AdLayout;
