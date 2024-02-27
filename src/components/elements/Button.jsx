import React from "react";

function Button({handleClick, children, styleCustom}) {
  const styleDefault = {
    background: "linear-gradient(194.68deg, #ffb548 11.27%, #f3af34 90.4%)",
    boxShadow: "0 1px 2px 0px black",
  };

  return (
    <button style={styleCustom ? styleCustom : styleDefault} onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
