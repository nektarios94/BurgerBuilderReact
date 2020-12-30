// const ingredients = {
//     salad: 1,
//     bacon: 1,
//     cheese: 2,
//     meat: 2
// }

// console.log ('1h Emfanis: ingredients[]: ',ingredients['salad']);

// const x = Object.keys(ingredients)
//         .map(igKey => {
//             console.log ('igKey: ',igKey);
//             console.log ('igKey + 2 ',igKey + 2);
//             console.log ('ingredients[igKey]: ',ingredients[igKey]);
//             return [...Array(ingredients[igKey])];
//         });

// console.log (typeof(x));
// console.log (x);

const array1 = [1,2,3,4];

console.log (array1);
let array2 = array1.reduce((accumulator, currentValue) => {
    
    console.log ('accumulator ',accumulator);
    console.log ('type of accumulator ',typeof(accumulator));
    console.log ('currentValue ',currentValue);
    return accumulator * currentValue;
    
}, [1]);

console.log('array1', array1);
console.log('array2', array2);
console.log (array1.concat(array2));

console.log ('apotelesma', [3] * '2')

let a = 1;
let b = 2;
console.log (a.concat(b));
//console.log (arraconcat ()