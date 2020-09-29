import React, { Component } from "react";
import Layout from "../hoc/Layout/component";
import BurgerBuilder from "./BurgerBuilder/component";
import Checkout from "./Checkout/component";
import { Route, Switch } from "react-router";
import Orders from "./Orders/component";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
