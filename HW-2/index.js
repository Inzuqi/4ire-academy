/* 
According to the task, f0, f1 may be of all integer numbers, and index number is set by a user
which might be both positive and negative. The functions are capable of taking other values,
constant values are there for the purpose of demonstration. The only formula available for use 
according to the task was the recursive Fibonacci formula, although Binet's formula is a more elegant
solution.
*/

// Acquiring positive Fibonacci numbers using tail recursion. Algorithm complexity: O(n).
const positiveFib = (f0 = 0, f1 = 1, n) => {
    if (n === 1) return f0;
    if (n === 2) return f1;
    if (n > 2) return positiveFib(f1, f0 + f1, --n);
}
/* 
Acquiring negative Fibonacci numbers according to negafibonacci formulae. 
https://en.wikipedia.org/wiki/Fibonacci_number 
*/
const negativeFib = (negativeF1 = 0, negativeF2 = 1, n) => {
    if (n === -1) return negativeF2;
    if (n < 0) return negativeFib(negativeF2, negativeF1 - negativeF2, ++n);
}

// Handling both negative and positive Fibonacci numbers in acordance to user input being positive or negative.
const fibonacciNum = (n) => { 
    if (n === 0) return 0;
    if (n < 0) {
        return negativeFib(0, 1, n);
    }
    if (n > 0) {
        return positiveFib(0, 1, n);
    }
}

const init = () => {
    let userInput = prompt('Your Fibonacci sequence number index is: ');
    if (userInput === null) {
        alert ('See you next time!');
    }

    let userNumber = Number(userInput);

    if (Number.isInteger(userNumber)) {
        alert (`Your desired number is: ${fibonacciNum(userNumber)}`);
        return; 
    }
    alert(`Your input is ${userInput}, which is not valid integer number, please try again!`);
    init();
}

init();