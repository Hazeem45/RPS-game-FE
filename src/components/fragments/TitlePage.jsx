import React from 'react';
import './styles/titlePage.css';
import PropTypes from 'prop-types';

function TitlePage({ children, classForTitle }) {
  return (
    <div className={`title-page ${classForTitle}`}>
      <h1>{children}</h1>
    </div>
  );
}

TitlePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  classForTitle: PropTypes.string,
};

export default TitlePage;
