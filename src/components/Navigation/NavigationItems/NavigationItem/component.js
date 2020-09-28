import React from "react";
import classes from './style.module.css'

const NavigationItem = ({active, link, children}) => (
  <li className={classes.NavigationItem}>
    <a 
        href={link}
        className={active ? classes.active : null}
    >{children}</a>
  </li>
);

export default NavigationItem;
