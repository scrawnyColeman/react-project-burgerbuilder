import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/component";
import Burger from "../../components/Burger/component";
import OrderSummary from "../../components/Burger/OrderSummary/component";
import Modal from "../../components/UI/Modal/component";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../components/UI/Spinner/component";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/component";
import axios from "../../axios-orders";

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true,
            });
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth")
        }
    };
    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    };
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    };
    updatePurchaseState = (ingredients) => {
        const ingredientKeys = Object.keys(ingredients);
        const ingredientValues = ingredientKeys.map((key) => {
            return ingredients[key];
        });

        const sumOfValues = ingredientValues.reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sumOfValues > 0 ? true : false;
    };

    render() {
        const disableInfo = {
            ...this.props.ings,
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? (
            <p>System failure. Contact admin</p>
        ) : (
            <Spinner />
        );
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdded}
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Auxiliary>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    continueClick={this.purchaseContinueHandler}
                    cancelClick={this.purchaseCancelHandler}
                    price={this.props.price}
                />
            );
        }

        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) =>
            dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) =>
            dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: (_) => dispatch(actions.initIngredients()),
        onIngredientsFailed: (ingredientName) =>
            dispatch(actions.fetchIngredientsFailed(ingredientName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
