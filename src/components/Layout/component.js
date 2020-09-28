import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import SideDrawer from "../Navigation/SideDrawer/component";
import Toolbar from "../Navigation/Toolbar/component";
import classes from "./style.module.css";

class Layout extends Component {
    state={
      showSideDrawer: true
    };

    sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false})
    };
    sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
        return {showSideDrawer: !this.state.showSideDrawer}
      })
    };

    render() {
        return (
            <Auxiliary>
                <Toolbar toggleDrawer={this.sideDrawerToggleHandler}/>
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Auxiliary>
        );
    }
}

export default Layout;
