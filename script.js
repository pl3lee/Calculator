const digitButtons = document.querySelectorAll('.digit.keypad-btn');
const clearButton = document.querySelector('#clear.keypad-btn');
const deleteButton = document.querySelector('#delete.keypad-btn');
const plusButton = document.querySelector('#plus.keypad-btn');
const minusButton = document.querySelector('#minus.keypad-btn');
const multiplyButton = document.querySelector('#times.keypad-btn');
const divideButton = document.querySelector('#divide.keypad-btn');
const display = document.querySelector('.display');


let bufferedOperation = "p";
let currentNumber = 0;
let storedNumber = 0;
let operations = {
    p: "plus",
    s: "subtract",
    m: "multiply",
    d: "divide",
    e: "exponent"
}
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
function plus(n1, n2) {
    return Number(n1) + Number(n2);
}
function subtract(n1, n2) {
    return Number(n1) - Number(n2);
}
function multiply(n2, n2) {
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
    for (let i = 0; i < power; i++) {
        tempProduct *= Number(num);
    }
    return Math.round(tempProduct * 100) / 100;
}
function clearDisplay(e) {
    currentNumber = 0;
    display.textContent = currentNumber.toString();
}
function deleteDigit(e) {
    let temp = currentNumber.toString().slice(0, -1);
    temp = Number(temp)
    currentNumber = temp
    display.textContent = currentNumber.toString();
}
function updateDisplayDigitClick(e) {
    let clickedNumber = digits[e.target.id];
    currentNumber = Number((currentNumber.toString()).concat(clickedNumber));
    display.textContent = currentNumber.toString();
    e.stopPropagation()
}
digitButtons.forEach(digitButton => {digitButton.addEventListener('click', updateDisplayDigitClick)});
clearButton.addEventListener('click', clearDisplay);
deleteButton.addEventListener('click', deleteDigit);
