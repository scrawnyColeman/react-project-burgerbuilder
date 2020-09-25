import React, { Component } from 'react'
import BuildControls from '../../components/Burger/BuildControls/component';
import Burger from '../../components/Burger/component';
import Auxiliary from '../../hoc/Auxiliary';

class BurgerBuilder extends Component {
    state={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 2
        }
    }
    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls/>
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;