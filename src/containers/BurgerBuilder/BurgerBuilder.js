import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        axios.get('/ingredients.json')
            .then( response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    updatePurchaseState (ingredients) { // if we make calculations based on this.state.ingredients instead of the ingredients passed we might 
        // be working with an outdated version of ingredients, due to the nature of setState()
        const sum = Object.values(ingredients).reduce((sum,el) => sum + el);
        console.log ('sum: ',sum);
        this.setState({purchasable: sum > 0})
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
        this.setState( {purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState ( {purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert ('You continue');
        this.setState( {loading: true } );
        
        const order = { 
            ingredients: this.state.ingredients, // this is NOT a setup you would use on a production ready app. You would need to
            price: this.state.totalPrice,         //  calculate the total price in the server, otherwise a user could manipulate the code
            customer: {                         //\
                name: 'Themis Dod',             // \
                address: {                      //  \
                    street: 'Teststreet 1',     //   \
                    zipDode: 44444,             //    \
                    country: 'Greece'           //      some dummy order data
                },                              //    /
                email: 'test@test.com'          //   /
            },                                  //  /
            deliveryMethod: 'fastest'           // /
        }
        axios.post('/orders.json', order) // 'when using Firebase (the website we used for generating our URL) you need to add '.json' 
            .then(response => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch (error => {
                this.setState({ loading: false, purchasing: false });
            });
    }

    render () {
        const disabledInfoLess = {
            ...this.state.ingredients
        };
        const disabledInfoMore = {
            ...this.state.ingredients
        };
        for (let key in disabledInfoLess) {
            disabledInfoLess[key] = (disabledInfoLess[key] == 0)
            
        }
        for (let key in disabledInfoMore) {
            disabledInfoMore[key] = (disabledInfoMore[key] >= 3)
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledLess={disabledInfoLess}
                        disabledMore={disabledInfoMore}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable} 
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />
        
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}    
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios); 