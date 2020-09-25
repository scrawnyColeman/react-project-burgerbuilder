import React from "react";
import classes from "./style.module.css";
import BuildControl from "./BuildControl/component";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = ({ addIngredient, removeIngredient, disabled }) => (
  <div className={classes.BuildControls}>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        addIngredient={() => addIngredient(ctrl.type)}
        removeIngredient={() => removeIngredient(ctrl.type)}
        disabled={disabled[ctrl.type]}
      />
    ))}
  </div>
);

export default BuildControls;
