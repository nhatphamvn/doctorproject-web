import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const accessToken = useSelector((state) => state.auth.account?.access_token);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
