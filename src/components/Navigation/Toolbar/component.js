import React from "react";
import Logo from "../../Logo/component";
import NavigationItems from "../NavigationItems/component";
import HamburgerToggle from "../SideDrawer/HamburgerToggle/component";
import classes from "./style.module.css";

const Toolbar = ({toggleDrawer}) => {

    return (
        <header className={classes.Toolbar}>
            <HamburgerToggle clicked={toggleDrawer}/>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default Toolbar;
