const calcButtons = document.querySelectorAll('.calc-buttons');

const display = document.querySelector('.display-output');
const displayTop = document.querySelector('.display-output-top');

const clearButton = document.querySelector('.clear');

//Operator functions
const add = (a,b) =>  a + b;
const subtract = (a,b) =>  a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

let number1 = 0;
let number2 = 0;
let operation = '';
let operatorSign = '';

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

const getNumberVal = buttonClicked => {
    number1 = +buttonClicked.innerHTML;
    displayVal(number1);
}

const getFuncVal = buttonClicked => {
    operation = buttonClicked.getAttribute('value');
    if(operation === "add") {
        operatorSign = "+";
    } else if(operation === "subtract") {
        operatorSign = "-"
    } else if(operation === "multiply") {
        operatorSign = "×"
    } else if(operation === "divide") {
        operatorSign = "÷"
    }
    displayFunc(operatorSign);
}

const displayFunc = operator => {
    displayTop.innerHTML = number1;
    displayTop.innerHTML += operator;
}

const displayVal = value => {
    display.innerHTML = value;
}


const clear = () => {
    display.innerHTML = '';
    displayTop.innerHTML = '';
} 


clearButton.addEventListener('click', clear);

calcButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if(e.target.classList.contains('number')) {
            getNumberVal(e.target);
        } else if(e.target.classList.contains('function')) {
            getFuncVal(e.target);
            displayFunc(operatorSign);
        }
    });
  }); 
