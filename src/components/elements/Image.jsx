import React from "react";

function Image({src, alt, classImg}) {
  return <img src={src} className={classImg} alt={alt} />;
}

export default Image;
