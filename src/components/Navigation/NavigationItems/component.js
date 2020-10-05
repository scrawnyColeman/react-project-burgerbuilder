import React from "react";
import NavigationItem from "./NavigationItem/component";
import classes from "./style.module.css";

const NavigationItems = ({isAuthenticated}) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link={"/"} exact>
      Burger Builder
    </NavigationItem>
    {isAuthenticated ? <NavigationItem link={"/orders"}>Orders</NavigationItem>:null}
    {!isAuthenticated ? 
    <NavigationItem link={"/auth"}>Authenticate</NavigationItem>
    :
    <NavigationItem link={"/logout"}>Logout</NavigationItem>
  }
  </ul>
);

export default NavigationItems;
