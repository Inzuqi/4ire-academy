const inputField = document.querySelector('input[type = "text"]');
const operations = document.querySelectorAll('.pink');
const numButtons = document.querySelectorAll('.black');
const eqSign = document.querySelector('.orange');
const memoryOps = document.querySelectorAll('.gray');
let mField = document.querySelector('div.display');
mField.insertAdjacentHTML('afterbegin', '<span class ="m" style="position: absolute; z-index: 1;" hidden>m</span>');
let mSign = document.querySelector('.m');

const VALID_KEY_NUMBERS = '0123456789';
const ENTER = 'Enter';
const VALID_KEY_OPERATORS = '/*-+';

const OPERATORS = {
    ADD: '+',
    SUB: '-',
    DIV: '/',
    MUL: '*',
    CLR: 'C',
    EQ: '=',
};

const CALCULATOR = {
    firstNum: 0,
    secondNum: 0,
    operator: '',
    result: 0,
    shouldClearDisplay: false,
    memClear: false,
    memory: 0,
};

function memorySign () {
    if (CALCULATOR.memory !== 0) {
        mSign.removeAttribute('hidden');
    } else {
        mSign.setAttribute('hidden', '');
    }

}

function addMemory() {
    CALCULATOR.memClear = false;
    CALCULATOR.memory += Number(inputField.value);
    memorySign();
}

function removeMemory() {
    CALCULATOR.memClear = false;
    CALCULATOR.memory -= Number(inputField.value);
    memorySign();
}

function memoryState() {
    if (!CALCULATOR.memClear) {
        inputField.value = CALCULATOR.memory;
        CALCULATOR.result = CALCULATOR.memory;
        CALCULATOR.memClear = true;
        memorySign();
        return;
    }
    CALCULATOR.memory = 0;
    CALCULATOR.memClear = false;
    memorySign();
}

function reset() {
    CALCULATOR.firstNum = 0;
    CALCULATOR.secondNum = 0;
    CALCULATOR.operator = '';
    inputField.value = '';
    CALCULATOR.result = 0;
}

const calculate = (operator) => {
    if (operator === OPERATORS.ADD) {
        CALCULATOR.result = Number(CALCULATOR.firstNum) + Number(CALCULATOR.secondNum);
    }

    if (operator === OPERATORS.SUB) {
        CALCULATOR.result = Number(CALCULATOR.firstNum) - Number(CALCULATOR.secondNum);
    }

    if (operator === OPERATORS.MUL) {
        CALCULATOR.result = Number(CALCULATOR.firstNum) * Number(CALCULATOR.secondNum);
    }

    if (operator === OPERATORS.DIV) {
        CALCULATOR.result = Number(CALCULATOR.firstNum) / Number(CALCULATOR.secondNum);
    }

    inputField.value = CALCULATOR.result;
    CALCULATOR.firstNum = CALCULATOR.result;

    if (inputField.value === 'Infinity') {
        console.log(CALCULATOR);
        CALCULATOR.shouldClearDisplay = true;
        reset();
        return inputField.value = 'Universe is in danger.';;
    }

    return CALCULATOR.result;
};

function handleKeyboardOperators() {
    if(!CALCULATOR.firstNum) {
        CALCULATOR.secondNum = Number(inputField.value);
    }
    CALCULATOR.firstNum = Number(inputField.value);
    inputField.value = '';
}

operations.forEach((e) => {
    e.addEventListener('click', () => {
        if (CALCULATOR.operator) {
            CALCULATOR.operator = e.value;
            calculate(CALCULATOR.operator);
            CALCULATOR.secondNum = 0;
            inputField.value = CALCULATOR.result;
        }
        CALCULATOR.operator = e.value;
        CALCULATOR.shouldClearDisplay = true;
    });
});

memoryOps.forEach((e) => {
    if (e.value === 'm+') {
        e.addEventListener('click', addMemory);
    }

    if (e.value === 'm-') {
        e.addEventListener('click', removeMemory);
    }

    if (e.value === 'mrc') {
        e.addEventListener('click', memoryState);
    }
});

numButtons.forEach((e) => {
    e.addEventListener('click', () => {
        if (e.value === 'C') {
            reset();
            return;
        }
        if (CALCULATOR.shouldClearDisplay) {
            inputField.value = '';
            CALCULATOR.shouldClearDisplay = false;
        }
        if (!CALCULATOR.operator) {
            CALCULATOR.firstNum += e.value;
            inputField.value += e.value;
        }
        if (CALCULATOR.operator) {
            CALCULATOR.secondNum += e.value;
            inputField.value += e.value;
        }
    });
});

const keyboardHandler = (e) => {
    if (e.key === ENTER || e.key === '=') {
        calculate(CALCULATOR.operator);
    }
    if (VALID_KEY_NUMBERS.includes(e.key)) {
        inputField.value += e.key;
    }
    if (VALID_KEY_OPERATORS.includes(e.key)) {
        CALCULATOR.operator = e.key;
        handleKeyboardOperators(CALCULATOR.operator);
    }
    if(e.key === 'Backspace') {
        reset();
    }
};

eqSign.addEventListener('click', () => calculate(CALCULATOR.operator));
document.addEventListener('keyup', keyboardHandler);