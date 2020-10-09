import React, { useEffect } from "react";
import Order from "./Order/component";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/component";
import Spinner from "../../components/UI/Spinner/component";
import * as actions from "../../store/actions";
import { connect } from "react-redux";

const Orders = ({ onFetchOrders, token, uid, loading, orders }) => {

  useEffect(() => {
        onFetchOrders(token, uid);
    }, [onFetchOrders, token, uid]);

    let orderList = <Spinner />;

    if (!loading) {
        orderList = orders.map((order) => {
            return (
                <Order
                    ingredients={order.ingredients}
                    price={order.price}
                    key={order.id}
                />
            );
        });
    }
    return <div>{orderList}</div>;
};
const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        uid: state.auth.userId,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) =>
            dispatch(actions.fetchOrders(token, userId)),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
