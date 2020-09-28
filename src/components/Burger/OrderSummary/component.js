import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from '../../UI/Button/component'

const OrderSummary = ({ ingredients, continueClick, cancelClick, price }) => {
  const ingredientKeys = Object.keys(ingredients);
  const ingredientValues = ingredientKeys.map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
        {ingredients[key]}
      </li>
    );
  });

  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A deliciour burger with the following ingredients</p>
      <ul>
          {ingredientValues}
      </ul>
      <p><strong>Total Price: £{price}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={cancelClick}>CANCEL</Button>
      <Button btnType="Success" clicked={continueClick}>CONTINUE</Button>
    </Auxiliary>
  );
};

export default OrderSummary;
