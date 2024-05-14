import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRouteProtection = ({ element }) => {
  const { user } = useSelector((state) => state.user);

  // Check if user is authenticated and is an admin
  const isAdmin = user.isAdmin;

  // Render the requested element if user is admin, otherwise redirect to suitable route
  return isAdmin ? element : <Navigate to="/user-auth" replace />;
};

export default AdminRouteProtection;
