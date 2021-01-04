import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
             salad: 0,
             bacon: 0,
             cheese: 0,
             meat:0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.values(ingredients).reduce((sum,el) => sum + el);
        console.log ('sum: ',sum);
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState ({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = this.state.ingredients[type] - 1;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState ({totalPrice: newPrice, ingredients: updatedIngredients});
            this.updatePurchaseState(updatedIngredients);
        }
        
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState ({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert ('You continue');
    }

    render () {
        const disabledInfoLess = {
            ...this.state.ingredients
        };
        const disabledInfoMore = {
            ...this.state.ingredients
        };
        for (let key in disabledInfoLess) {
            disabledInfoLess[key] = (disabledInfoLess[key] <= 0)
        }
        for (let key in disabledInfoMore) {
            disabledInfoMore[key] = (disabledInfoMore[key] >= 3)
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledLess={disabledInfoLess}
                    disabledMore={disabledInfoMore}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable} 
                    ordered={this.purchaseHandler} />
            </Aux>
        )
    }
}

export default BurgerBuilder; 