import React from "react";
import classes from "./style.module.css";

const Button = ({ btnType, clicked, disabled, children }) => (
  <button
    className={[classes.Button, classes[btnType]].join(" ")}
    onClick={clicked}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
