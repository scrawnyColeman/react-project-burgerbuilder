import React, { Component } from "react";
import Order from "./Order/component";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/component";
import Spinner from "../../components/UI/Spinner/component";
import * as actions from '../../store/actions'
import { connect } from "react-redux";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    this.props.onFetchOrders()
  }
  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map(order => {
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
const mapStateToProps = state =>{
  return{
    orders: state.order.orders,
    loading: state.order.loading
  }
}
const mapDispatchToProps= dispatch =>{
  return {
    onFetchOrders: ()=> dispatch(actions.fetchOrders())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
