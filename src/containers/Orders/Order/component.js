import React from "react";
import classes from "./style.module.css";

const Order = ({ ingredients, price }) => {
  const ingredientsTransformed = [];
  for (let igName in ingredients) {
    ingredientsTransformed.push({ name: igName, amount: ingredients[igName] });
  }

  const ingredientOutput = ingredientsTransformed.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      >
        {ig.name} : {ig.amount}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>£{Number(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
