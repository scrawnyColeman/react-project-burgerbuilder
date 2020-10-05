import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/component";
import Toolbar from "../../components/Navigation/Toolbar/component";
import classes from "./style.module.css";
import { connect } from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };
    sideDrawerToggleHandler = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer });
    };

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    toggleDrawer={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}
                />
                <SideDrawer
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}
                    isAuth={this.props.isAuthenticated}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};
export default connect(mapStateToProps)(Layout);
