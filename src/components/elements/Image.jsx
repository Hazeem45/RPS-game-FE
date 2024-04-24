import React from "react";

function Image({src, alt, classImg}) {
  const handleImage = (e) => {
    e.preventDefault();
  };

  return <img src={src} className={`unselectable ${classImg}`} alt={alt} onContextMenu={handleImage} onDragStart={handleImage} />;
}

export default Image;
