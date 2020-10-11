import React, { useCallback, useEffect, useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/component";
import Burger from "../../components/Burger/component";
import OrderSummary from "../../components/Burger/OrderSummary/component";
import Modal from "../../components/UI/Modal/component";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Spinner from "../../components/UI/Spinner/component";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/component";
import axios from "../../axios-orders";

export const BurgerBuilder = ({ history }) => {
    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const onIngredientAdded = (ingredientName) =>
        dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved = (ingredientName) =>
        dispatch(actions.removeIngredient(ingredientName));
    const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients()),
        [dispatch]
    );
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) =>
        dispatch(actions.setAuthRedirectPath(path));

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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
    let burger = error ? <p>System failure. Contact admin</p> : <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
