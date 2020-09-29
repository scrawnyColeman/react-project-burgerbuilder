import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/component";
import Burger from "../../components/Burger/component";
import OrderSummary from "../../components/Burger/OrderSummary/component";
import Modal from "../../components/UI/Modal/component";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/component";
import withErrorHandler from "../../hoc/withErrorHandler/component";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: true,
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    axios
      .get("https://react-my-burger-90b75.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  updatePurchaseState = ingredients => {
    const ingredientKeys = Object.keys(ingredients);
    const ingredientValues = ingredientKeys.map(key => {
      return ingredients[key];
    });

    const sumOfValues = ingredientValues.reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({ purchaseable: sumOfValues > 0 ? true : false });
  };
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };
  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>System failure. Contact admin</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            purchasing={this.purchaseHandler}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          continueClick={this.purchaseContinueHandler}
          cancelClick={this.purchaseCancelHandler}
          price={this.state.totalPrice.toFixed(2)}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);
