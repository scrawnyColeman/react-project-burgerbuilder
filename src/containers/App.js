import React, { Component } from "react";
import Layout from "../hoc/Layout/component";
import BurgerBuilder from "./BurgerBuilder/component";
import { Redirect, Route, Switch, withRouter } from "react-router";
import Logout from "./Auth/Logout/component";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import asyncComponent from '../hoc/asyncComponent/component'

const asyncCheckout = asyncComponent(()=>{
    return import ('./Checkout/component')
})
const asyncOrders = asyncComponent(()=>{
    return import ('./Orders/component')
})
const asyncAuth = asyncComponent(()=>{
    return import ('./Auth/component')
})
class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />;
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
