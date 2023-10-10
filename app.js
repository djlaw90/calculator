const calcButtons = document.querySelectorAll('.calc-buttons');

const mainDisplay = document.querySelector('.display-output');
const displayTop = document.querySelector('.display-output-top');

const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');

//Operator functions
const add = (a,b) =>  a + b;
const subtract = (a,b) =>  a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

let operand1 = 0;
let operand2 = 0;
let operatorSign = null;
let shouldResetDisplay = false;

const operate = (number1, number2) => {
    let result;
    if(operatorSign === "+") {
        result = add(number1, number2);
    } else if (operatorSign === "-") {
        result = subtract(number1, number2);
    } else if (operatorSign === "×") {
        result = multiply(number1, number2);
    } else {
        result = divide(number1, number2);
    }
    displayTop.textContent = `${operand1} ${operatorSign} ${operand2} =`
    mainDisplay.textContent = result;
}

const appendNum = numClicked => {
    if(mainDisplay.textContent === '0' || shouldResetDisplay) {
        resetDisplay();
    }
    mainDisplay.textContent += numClicked.textContent;
}


const resetDisplay = () => {
    shouldResetDisplay = false;
    mainDisplay.textContent = '';
}

const setOperation = currentOperation => {
    newInput = true;
    let operation = currentOperation.getAttribute('value');
    if(operation === "add") {
        operatorSign = "+";
    } else if(operation === "subtract") {
        operatorSign = "-";
    } else if(operation === "multiply") {
        operatorSign = "×";
    } else if(operation === "divide") {
        operatorSign = "÷";
    }
    operand1 = +mainDisplay.textContent;
    displayTop.textContent = `${operand1} ${operatorSign}`;
    shouldResetDisplay = true;
}

const evaluate = () => {
    operand2 = +mainDisplay.textContent;
    operate(operand1, operand2);
}

const clear = () => {
    mainDisplay.innerHTML = '';
    displayTop.innerHTML = '';
    number1 = 0;
    number2 = 0;
    operation = '';
    operatorSign = '';
} 

clearButton.addEventListener('click', clear);

equalButton.addEventListener('click', evaluate);

calcButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if(e.target.classList.contains('number')) {
            appendNum(e.target);
        } else if(e.target.classList.contains('function')) {
            setOperation(e.target);
        }
    });
  }); 

  //init();
