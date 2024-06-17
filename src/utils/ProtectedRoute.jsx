import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function ProtectedRoute({ children }) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return <Navigate to={'/login'} />;
  } else {
    return children;
  }
}
ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
