import React from 'react';
import PropTypes from 'prop-types';

function Image({ src, alt, classImg }) {
  const handleImage = (e) => {
    e.preventDefault();
  };

  return <img src={src} className={`unselectable ${classImg}`} alt={alt} onContextMenu={handleImage} onDragStart={handleImage} />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  classImg: PropTypes.string,
};

export default Image;
