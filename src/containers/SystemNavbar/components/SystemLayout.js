import React from 'react';
import { Outlet } from 'react-router-dom';
import SystemNavbar from '../pages/SystemNavbar';

const SystemLayout = () => {
  return (
    <>
      <SystemNavbar />
      <div className="container mx-auto p-4">
        <Outlet /> {/* Nội dung của /system/user-all hoặc /admin */}
      </div>
    </>
  );
};

export default SystemLayout;