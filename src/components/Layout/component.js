import React from "react";
import Auxiliary from '../../hoc/Auxiliary'
import classes from './style.module.css'

const Layout = ({ children }) => (
  <Auxiliary>
    <div>Toolbar Sidedrawer Backdrop</div>
    <main className={classes.Content}>
      {children}
    </main>
  </Auxiliary>
);

export default Layout;
