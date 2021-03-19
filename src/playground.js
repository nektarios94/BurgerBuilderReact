ingredients = {
    cheese: 0,
    salad: 0,
    meat: 0,
    bacon: 0
};

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
