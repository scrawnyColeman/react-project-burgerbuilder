import React, { useEffect, useState } from "react";
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

export const BurgerBuilder = ({
    onInitIngredients,
    isAuthenticated,
    onSetAuthRedirectPath,
    history,
    ings,
    onInitPurchase,
    price,
    onIngredientAdded,
    onIngredientRemoved,
    error
}) => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath("/checkout");
            history.push("/auth");
        }
    };
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };
    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push("/checkout");
    };
    const updatePurchaseState = (ingredients) => {
        const ingredientKeys = Object.keys(ingredients);
        const ingredientValues = ingredientKeys.map((key) => {
            return ingredients[key];
        });

        const sumOfValues = ingredientValues.reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sumOfValues > 0 ? true : false;
    };

    const disableInfo = {
        ...ings,
    };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? (
        <p>System failure. Contact admin</p>
    ) : (
        <Spinner />
    );
    if (ings) {
        burger = (
            <Auxiliary>
                <Burger ingredients={ings} />
                <BuildControls
                    addIngredient={onIngredientAdded}
                    removeIngredient={onIngredientRemoved}
                    disabled={disableInfo}
                    price={price}
                    purchaseable={updatePurchaseState(ings)}
                    purchasing={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Auxiliary>
        );
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                continueClick={purchaseContinueHandler}
                cancelClick={purchaseCancelHandler}
                price={price}
            />
        );
    }

    return (
        <Auxiliary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
};

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
        onSetAuthRedirectPath: (path) =>
            dispatch(actions.setAuthRedirectPath(path)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
