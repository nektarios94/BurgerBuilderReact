import React from 'react';

ingredients = {
    cheese: 2,
    salad: 3,
    meat: 1,
    bacon: 1
};

const aReactFunction = () => {

    let transformedIngredients = Object.keys(ingredients).map(key => {
        return [...Array(ingredients[key])].map((_, i) =>  {
        return {type: key, index: i}
            });
    })
    .reduce((arr, el, i) => {
        console.log(i + "st ITERATION");
        console.log("arr: ", arr);
        console.log("el: ", el);
        return arr.concat(el)
    });



    console.log("transformedIngredients: ", transformedIngredients);
    const sum = Object.values(ingredients).reduce(( sum, el ) => sum +=el);
    console.log (ingredients);
    const arr;
    <ul>
        {arr = Object.entries(ingredients).map([key, value] => {
            <li>{key}: {value}</li>
        })}
    </ul>
}
