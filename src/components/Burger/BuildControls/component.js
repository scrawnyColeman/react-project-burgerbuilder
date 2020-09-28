import React from "react";
import classes from "./style.module.css";
import BuildControl from "./BuildControl/component";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = ({
  addIngredient,
  removeIngredient,
  disabled,
  price,
  purchaseable,
  purchasing
}) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        addIngredient={() => addIngredient(ctrl.type)}
        removeIngredient={() => removeIngredient(ctrl.type)}
        disabled={disabled[ctrl.type]}
      />
    ))}
    <button className={classes.OrderButton} 
    disabled={!purchaseable}
    onClick={purchasing}
    >
      ORDER NOW
    </button>
  </div>
);

export default BuildControls;
