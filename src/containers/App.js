import React, { useEffect, Suspense } from "react";
import Layout from "../hoc/Layout/component";
import BurgerBuilder from "./BurgerBuilder/component";
import { Redirect, Route, Switch, withRouter } from "react-router";
import Logout from "./Auth/Logout/component";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const Checkout = React.lazy(() => {
    return import("./Checkout/component");
});
const Orders = React.lazy(() => {
    return import("./Orders/component");
});
const Auth = React.lazy(() => {
    return import("./Auth/component");
});
const App = (props) => {
    const { isAuthenticated, onTryAutoSignup } = props;

    useEffect(() => {
        onTryAutoSignup();
    }, [onTryAutoSignup]);

    let routes = (
        <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );
    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />;
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </div>
    );
};
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
