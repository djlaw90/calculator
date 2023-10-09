const calcButtons = document.querySelectorAll('.calc-buttons.number');
const operatorButtons = document.querySelector('.calc-buttons.function');

const display = document.querySelector('.display-output');
const clearButton = document.querySelector('.clear');

//Operator functions
const add = (a,b) =>  a + b;
const subtract = (a,b) =>  a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

let number1 = 0;
let number2 = 0;
let operator = "";

const operate = (operator, number1, number2) => {
    let result;
    if(operator === "add") {
        result = add(number1, number2);
    } else if (operator === "subtract") {
        result = subtract(number1, number2);
    } else if (operator === "multiply") {
        result = multiply(number1, number2);
    } else {
        result = divide(number1, number2);
    }
}

const getVal = e => {
    const value = e.getAttribute('value');
    displayVal(value);
}

const displayVal = value => {
    display.innerHTML += value;
}


const clear = () => display.innerHTML = '';


clearButton.addEventListener('click', clear);

calcButtons.forEach(button => {
    button.addEventListener("click", () => {
      getVal(button);
    });
  }); 
