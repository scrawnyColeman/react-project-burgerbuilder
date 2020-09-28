import React from "react";
import logo from '../../assets/images/burger-logo.png'
import classes from './style.module.css'

const Logo = ({height}) => (
  <div className={classes.Logo} style={{height: height}}>
    <img src={logo} alt="MyBurger"/>
  </div>
);

export default Logo;
