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
    const {onFetchOrders, token, uid} = this.props;
    onFetchOrders(token, uid);
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
    loading: state.order.loading,
    token: state.auth.token,
    uid: state.auth.userId
  }
}
const mapDispatchToProps= dispatch =>{
  return {
    onFetchOrders: (token, userId)=> dispatch(actions.fetchOrders(token, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
