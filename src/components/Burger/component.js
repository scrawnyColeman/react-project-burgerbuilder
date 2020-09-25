import React from "react";
import classes from "./style.module.css";
import BurgerIngredient from "./BurgerIngredient/component";

const Burger = ({ingredients}) => {
  const ingredientKeys = Object.keys(ingredients);

  let ingredientItems = ingredientKeys.map((key) => {
    return [...Array(ingredients[key])].map((index) => (
      <BurgerIngredient key={key + index} type={key} />
      ));
    });

  const reducedArray = ingredientItems.reduce((arr,el)=>{
    return arr.concat(el);
  }, []);

  if(reducedArray.length === 0){
    ingredientItems = <p>Please add ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientItems}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;