const digitButtons = document.querySelectorAll('.digit.keypad-btn');
const clearButton = document.querySelector('#clear.keypad-btn');
const deleteButton = document.querySelector('#delete.keypad-btn');
const display = document.querySelector('.display');
let currentNumber = 0;
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
