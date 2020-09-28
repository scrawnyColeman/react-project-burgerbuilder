import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Logo from "../../Logo/component";
import Backdrop from "../../UI/Backdrop/component";
import NavigationItems from "../NavigationItems/component";
import classes from "./style.module.css";

const SideDrawer = ({open, closed}) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    } 
    return (
        <Auxiliary>
            <Backdrop show={open} clicked={closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>
    );
};

export default SideDrawer;
