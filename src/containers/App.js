import React, { Component } from "react";
import Layout from "../components/Layout/component";
import BurgerBuilder from "./BurgerBuilder/component";

class App extends Component {
  state={

  }
  render() {
    return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
    );
  }

}

export default App;
