import React from "react";
import classes from "./style.module.css";
import BuildControl from "./BuildControl/component";

const controls = [
    { label: "salad", type: "salad" },
    { label: "bacon", type: "bacon" },
    { label: "cheese", type: "cheese" },
    { label: "meat", type: "meat" },
];

const BuildControls = ({
    addIngredient,
    removeIngredient,
    disabled,
    price,
    purchaseable,
    purchasing,
    isAuth,
}) => {

    return (
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
            <button
                className={classes.OrderButton}
                disabled={!purchaseable}
                onClick={purchasing}
            >
                {isAuth ? 'ORDER NOW': 'SIGN UP TO ORDER'}
            </button>
        </div>
    );
};

export default BuildControls;
