let ingredients = ['bacon', 'cheese', 'meat', 'salad'];
let temp;
for (i=3; i>=1; i--) {
    temp = ingredients[i];
    ingredients[i] = ingredients[i-1];
    ingredients[i-1] = temp;
}

console.log(ingredients);