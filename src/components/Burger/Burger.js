import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    
    let initialIngredients = Object.keys(props.ingredients); // Object.keys: Javascript function of Object object: creates an array of the given object's properties (["salad","cheese"...])
    let i;
    let temp;
    for (i=3; i>=1; i--) {
        temp = initialIngredients[i];
        initialIngredients[i] = initialIngredients[i-1];
        initialIngredients[i-1] = temp;
    }
    let transformedIngredients = initialIngredients.map(igKey => {
        return [...Array(props.ingredients[igKey])].map ((_, i) =>  //... :creating new array with the spread operator // Array(): creates an array with empty spaces. As an initial value it gets the length of the array that we want
            <BurgerIngredient key={igKey + i} type={igKey} />
            );
    })
    .reduce((arr, el) => {
        return arr.concat(el); // concat: merges two or more arrays
    }, []);
    console.log('transformedIngredients: ', transformedIngredients );

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div  className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;