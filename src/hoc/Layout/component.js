import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import SideDrawer from "../../components/Navigation/SideDrawer/component";
import Toolbar from "../../components/Navigation/Toolbar/component";
import classes from "./style.module.css";

class Layout extends Component {
    state={
      showSideDrawer: false
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
