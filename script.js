const digitButtons = document.querySelectorAll('.digit.keypad-btn');
const clearButton = document.querySelector('#clear.keypad-btn');
const deleteButton = document.querySelector('#delete.keypad-btn');
const operationButtons = document.querySelectorAll('.operation.keypad-btn');
const dotButton = document.querySelector('#dot.keypad-btn');
const display = document.querySelector('.display');
const upperText = document.querySelector('.upperText');
const lowerText = document.querySelector('.lowerText');
const storedNumberDisplay = document.querySelector('.storedNumberDisplay');



let bufferedOperation = "p";
let currentNumber = 0;
let storedNumber = 0;
let decimalPoint = false;
let needReset = false;
const digits = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0
}
// Functions for operations
function plus(n1, n2) {
    return Number(n1) + Number(n2);
}

function subtract(n1, n2) {
    return Number(n1) - Number(n2);
}

function multiply(n1, n2) {
    console.log('mult')
    console.log(n1);
    return Math.round(Number(n1) * Number(n2) * 100) / 100;
}

function divide(n1, n2) {
    if (n2 === 0) {
        return false;
    } else {
        return Math.round((Number(n1) / Number(n2)) * 100) / 100;
    }
}

function exponent(n1, n2) {
    let tempProduct = 1;
    for (let i = 0; i < n2; i++) {
        tempProduct *= Number(n1);
    }
    return Math.round(tempProduct * 100) / 100;
}

// Functions when buttons clicked
function clearDisplay(e) {
    currentNumber = 0;
    storedNumber = 0;
    bufferedOperation = 'p';
    display.textContent = currentNumber.toString();
    storedNumberDisplay.textContent = storedNumber.toString();
    needReset = false;
}

function deleteDigit(e) {
    if (needReset) {
        return;
    }
    let temp = currentNumber.toString().slice(0, -1);
    temp = Number(temp)
    currentNumber = temp
    display.textContent = currentNumber.toString();
}

function updateDisplayDigitClick(e) {
    if (needReset) {
        return;
    }
    let clickedNumber = digits[e.target.id];
    if (!decimalPoint) {
        currentNumber = Number((currentNumber.toString()).concat(clickedNumber));
    } else {
        currentNumber = Number((currentNumber.toString()).concat(".").concat(clickedNumber));
        decimalPoint = false;
    }
    display.textContent = currentNumber.toString();
    e.stopPropagation()
}

function updateDisplayOperation(e) {
    if (needReset) {
        return;
    }
    if (bufferedOperation === 'p') {
        currentNumber = plus(storedNumber, currentNumber);
    } else if (bufferedOperation === 's') {
        currentNumber = subtract(storedNumber, currentNumber);
    } else if (bufferedOperation === 'm') {
        currentNumber = multiply(storedNumber, currentNumber);
    } else if (bufferedOperation === 'd') {
        currentNumber = divide(storedNumber, currentNumber);
    } else {
        currentNumber = exponent(storedNumber, currentNumber);
    }
    if (currentNumber === false) {
        display.textContent = 'Please do not divide by zero. Press clear to reset.';
        storedNumberDisplay.textContent = 'Please do not divide by zero. Press clear to reset.';
        needReset = true;
        return;
    }
    storedNumber = currentNumber;
    console.log(storedNumber);
    currentNumber = 0;
    if (e.target.id === 'equal') {
        bufferedOperation = 'p';
        display.textContent = storedNumber.toString();
        storedNumber = 0;
    } else {
        bufferedOperation = e.target.id;
        display.textContent = currentNumber.toString();
    }
    storedNumberDisplay.textContent = storedNumber.toString();
}

function decimalPointClicked(e) {
    if (needReset) {
        return;
    }
    if (!currentNumber.toString().includes('.')) {
        decimalPoint = true;
    } 
}

digitButtons.forEach(digitButton => {digitButton.addEventListener('click', updateDisplayDigitClick)});
clearButton.addEventListener('click', clearDisplay);
deleteButton.addEventListener('click', deleteDigit);
operationButtons.forEach(operationButton => {operationButton.addEventListener('click', updateDisplayOperation)})
dotButton.addEventListener('click', decimalPointClicked);
