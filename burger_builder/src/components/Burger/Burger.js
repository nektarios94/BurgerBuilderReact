import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map ((_, i) =>  //... :creating new array with the spread operator // Array(): creates an array with empty spaces. As an initial value its gets the length of the array that we want
                <BurgerIngredient key={igKey + i} type={igKey} />
                );
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    console.log(transformedIngredients );

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div  className={classes.Burger}>
            {console.log ('burger component')}
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;