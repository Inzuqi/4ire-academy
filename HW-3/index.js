// Create a function that accepts two arguments, one of which is an array, the second is a data type. The function has to return an array that is missing the specified data types.
const arr = [1, '1', undefined, null, ['test'], { test: 'value' }, NaN, 12345n, true, Symbol(13), function(){}];

const filterBy = (array, type) => {
    return array.filter((item) => {
        if (type === 'object') {
            return item === null || (typeof item !== type && typeof item !== 'function');
        } else if (type === 'null') {
            return item !== null;
        } else if (type === 'array') {
            return !Array.isArray(item);
        } else {
            return typeof item !== type; 
        }
    });
};

console.log('Filtered by strings: ', filterBy(arr, 'string'));
console.log('Filtered by bigint: ', filterBy(arr, 'bigint'));
console.log('Filtered by booleans: ', filterBy(arr, 'boolean'));
console.log('Filtered by undefined: ', filterBy(arr, 'undefined'));
console.log('Filtered by symbol: ', filterBy(arr, 'symbol'));

// Since functions, objects and arrays are all objects, they should get removed if basic objects are removed.
console.log('Filtered by objects: ', filterBy(arr, 'object'));
// Null is considered an object, despite being a primitive data type. It requires separate handling.
console.log('Filtered by null: ', filterBy(arr, 'null'));
// Despite arrays technically being of Object type and not their own, they are also handled separately, since they are a special case of Objects.  
console.log('Filtered by arrays: ', filterBy(arr, 'array')); 
// Function is not a standalone data type, but is a Function Object. Still, if checked with typeof, it returns 'function', so they're also handled separately.
console.log('Filtered by functions: ', filterBy(arr, 'function')); 
// NaN is of type 'number', hence, it does not require separate handling and is removed along with other numbers.
console.log('Filtered by numbers: ', filterBy(arr, 'number')); 
