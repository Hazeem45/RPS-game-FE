import React from 'react';
import './authLayout.css';
import AboutGame from '../../components/templates/AboutGame';
import PropTypes from 'prop-types';

function AuthLayout({ children }) {
  return (
    <div className={`authentication-layout ${location.pathname === '/register' && 'reverse-row'}`}>
      <AboutGame />
      <main>{children}</main>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
