import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENTS_PRICES = {
  salad: 0.8,
  baconHalal: 1.2,
  cheese: 1.5,
  meat: 2.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      baconHalal: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 2.5,
    purchasable: true,
  };

  updatePurchasaState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((eaching) => {
        return ingredients[eaching];
      })
      .reduce((start, el) => {
        return start + el;
      }, 0);
    this.setState({
      purchasable: sum === 0,
    });
  };

  addIngredientHandler = (type) => {
    const oldIngredientsCount = this.state.ingredients[type];
    const updateCount = oldIngredientsCount + 1;
    const copyOfIngredients = {
      ...this.state.ingredients,
    };
    copyOfIngredients[type] = updateCount;
    const ingredientPrice = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = ingredientPrice + oldPrice;
    this.setState({
      ingredients: copyOfIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchasaState(copyOfIngredients);
  };
  removeIngredientHandler = (type) => {
    const oldIngredientsCount = this.state.ingredients[type];
    if (oldIngredientsCount === 0) {
      return;
    }
    const updateCount = oldIngredientsCount - 1;
    const copyOfIngredients = {
      ...this.state.ingredients,
    };
    copyOfIngredients[type] = updateCount;
    const ingredientPrice = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - ingredientPrice;
    this.setState({
      ingredients: copyOfIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchasaState(copyOfIngredients);
  };

  zeroIngredientsCheck = () => {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return disabledInfo;
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredientHandler={this.addIngredientHandler}
          removeIngredientHandler={this.removeIngredientHandler}
          disabled={this.zeroIngredientsCheck()}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
