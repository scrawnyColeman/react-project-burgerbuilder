import React, { useState } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/component";
import Toolbar from "../../components/Navigation/Toolbar/component";
import classes from "./style.module.css";
import { connect } from "react-redux";

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)
    const {isAuthenticated, children} = props
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    };
    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    };

    return (
        <Auxiliary>
            <Toolbar
                toggleDrawer={sideDrawerToggleHandler}
                isAuth={isAuthenticated}
            />
            <SideDrawer
                closed={sideDrawerClosedHandler}
                open={showSideDrawer}
                isAuth={isAuthenticated}
            />
            <main className={classes.Content}>{children}</main>
        </Auxiliary>
    );
};
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};
export default connect(mapStateToProps)(Layout);
