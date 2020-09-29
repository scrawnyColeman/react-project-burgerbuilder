import React, { Component } from "react";
import Order from "./Order/component";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/component";
import Spinner from "../../components/UI/Spinner/component";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = <Spinner />;

    if (!this.state.loading) {
      orders = this.state.orders.map(order => {
        return (
          <Order
            ingredients={order.ingredients}
            price={order.price}
            key={order.id}
          />
        );
      });
    }
    return <div>{orders}</div>;
  }
}
export default withErrorHandler(Orders, axios);
