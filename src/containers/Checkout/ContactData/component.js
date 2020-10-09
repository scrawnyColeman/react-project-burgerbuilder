import React, { useState } from "react";
import Button from "../../../components/UI/Button/component";
import classes from "./style.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/component";
import Input from "../../../components/UI/Input/component";
import data from "../../../constants/orderFormLayout";
import withErrorHandler from "../../../hoc/withErrorHandler/component";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = ({ings, price, uid, onOrderBurger, token, loading}) => {
    
    const [orderForm, setOrderForm] = useState(data.orderForm);
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] =
                orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: ings,
            price: price,
            orderData: formData,
            userId: uid,
        };

        onOrderBurger(order, token);
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(
                event.target.value,
                orderForm[inputIdentifier]
            ),
            touched: true,
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement,
        });
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid =
                updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) =>
                        inputChangedHandler(event, formElement.id)
                    }
                />
            ))}
            <Button btnType="Success" disabled={!formIsValid}>
                ORDER
            </Button>
        </form>
    );
    if (loading) {
        form = <Spinner />;
    }
    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        uid: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) =>
            dispatch(actions.purchaseBurger(orderData, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
