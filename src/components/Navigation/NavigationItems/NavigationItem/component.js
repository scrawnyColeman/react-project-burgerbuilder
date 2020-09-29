import React from "react";
import classes from "./style.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = ({ exact, link, children }) => (
  <li className={classes.NavigationItem}>
    <NavLink activeClassName={classes.active} to={link} exact={exact}>
      {children}
    </NavLink>
  </li>
);

export default NavigationItem;
