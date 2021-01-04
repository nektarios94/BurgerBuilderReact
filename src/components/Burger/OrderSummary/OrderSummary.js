import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // this could ne a functional Component, doesn't have to be a class

    render () {

        const ingredientSummary = Object.keys( this.props.ingredients )
        .map ( igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2) /*with toFixed() you determine the amount of decimals*/}€</strong></p>
                <p>Continue to Checkout?</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> {/* το style το ειδα απο το internet */}
                    <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
                    <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
                </div>
        </Aux>
        )
    }

}

export default OrderSummary;