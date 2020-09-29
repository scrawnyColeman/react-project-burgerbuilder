import React from "react";
import Burger from "../../Burger/component";
import Button from "../../UI/Button/component";
import classes from "./style.module.css";

const CheckoutSummarys = ({
  ingredients,
  checkoutCancelled,
  checkoutContinued
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes great!</h1>
      <div className={classes.BurgerContainer}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked={checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummarys;
