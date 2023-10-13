const mainDisplay = document.querySelector('.display-output');
const displayTop = document.querySelector('.display-output-top');

const calcButtons = document.querySelectorAll('.calc-buttons');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.clear-entry');
const equalButton = document.querySelector('.equal');
const decimalButton = document.querySelector('.decimal');
const plusMinusButton = document.querySelector('.plus-minus');

//Operator functions
const add = (a,b) =>  a + b;
const subtract = (a,b) =>  a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => {
    if(b === 0) {
        alert('Can\'t let you do that, Star Fox!');
    }
    return a / b;
};

let operand1 = 0;
let operand2 = 0;
let operatorSign = null;
let shouldResetDisplay = false;
let calculationComplete = false;
let additiveInv = false;

const operate = (number1, number2) => {
    let result;
    if(operatorSign === "+") {
        result = add(number1, number2);
    } else if (operatorSign === "-") {
        result = subtract(number1, number2);
    } else if (operatorSign === "×") {
        result = multiply(number1, number2);
    } else if (operatorSign === "÷") {
        result = divide(number1, number2);
    }

    
    try {
        //Handles large/irrational/repeating nums
        if(result.toString().length > 14 && result < 1) {
            result = result.toFixed(10);
        }
        if(result.toString().length > 14 && result > 10000000000) {
            displayTop.style.fontSize = '20px';
            result = result.toPrecision(3);
        }

        //Handles division by 0
        result === Infinity ? 
        mainDisplay.textContent = 'UNDEFINED' : 
        mainDisplay.textContent = result;

        displayTop.textContent = `${operand1} ${operatorSign} ${operand2} =`
        calculationComplete = true;
    }

    catch(err) {
        displayTop.textContent = '';
        alert("Nothing to evaluate. Please select an operator.");
    }
}


const appendNum = numClicked => {
    if(mainDisplay.textContent === '0' || shouldResetDisplay) {
        resetDisplay();
    } else if(mainDisplay.textContent.toString().length > 13) {
        //prevents numbers from breaking display
        return;
    } 
    mainDisplay.textContent += numClicked.textContent;
}


const resetDisplay = () => {
    shouldResetDisplay = false;
    mainDisplay.textContent = '';
}

const setOperation = currentOperation => {
    let operation = currentOperation;
    newInput = true;
    calculationComplete = false;
    //Accomodates keyboard input
    if(typeof currentOperation !== "string"){
        operation = currentOperation.getAttribute('value');
    }

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

const deleteLastNum = () => {
    //prevent last num delete if already a calculation submitted
    if (calculationComplete) return;
    mainDisplay.textContent = [...mainDisplay.textContent]
    .slice(0,-1)
    .join(''); 
}

const addDecimal = () => {
    let tempArr = [...mainDisplay.textContent];
    if(tempArr.includes('.')) return;
    tempArr.push('.');
    mainDisplay.textContent = tempArr.join('');
}

const getSetAdditiveInverse = () => {
    //prevent changing anything later on
    if(additiveInv || mainDisplay.textContent === "0") return;
    let tempArr = [...mainDisplay.textContent];
    if(tempArr.includes('-')) {
        tempArr.shift();
    } else {
        tempArr.unshift("-");
    }
    mainDisplay.textContent = tempArr.join('');
}

const clear = () => {
    mainDisplay.innerHTML = '0';
    displayTop.innerHTML = '';
    operand1 = 0;
    operand2 = 0;
    operation = '';
    operatorSign = '';
    calculationComplete = false;
    shouldResetDisplay = false;
    additiveInv = false;
} 

//Event Listeners

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteLastNum);
equalButton.addEventListener('click', evaluate);
decimalButton.addEventListener('click', addDecimal);
plusMinusButton.addEventListener('click', getSetAdditiveInverse);

calcButtons.forEach(button => {
    if(calculationComplete) {
        clear();
    }
    button.addEventListener("click", (e) => {
        if(e.target.classList.contains('number')) {
            appendNum(e.target);
        } else if(e.target.classList.contains('function')) {
            setOperation(e.target);
        }
    });
  }); 

//Keyboard support
document.addEventListener('keydown', (event) => {
    const isNumber = isFinite(event.key);
    if(event.key === "Backspace") {
        deleteLastNum();
    }
    if(calculationComplete) {
        clear();
    }
    if(event.key === "Enter" && !calculationComplete) {
        evaluate();
    }
    if(event.key === "+") {
        setOperation("add");
    } else if(event.key === "-") {
        setOperation("subtract")
    } else if(event.key === "/") {
        setOperation("divide");
    } else if(event.key === "*" || event.key === "x") {
        setOperation("multiply");
    }

    if(isNumber || event.key === "."){
        if(event.key === ".") {
            let tempArr = [...mainDisplay.textContent];
            if(tempArr.includes('.')) return;
            mainDisplay.textContent = tempArr.join('');
        }
        if(mainDisplay.textContent === '0' || shouldResetDisplay) {
            resetDisplay();
        } else if(mainDisplay.textContent.toString().length > 13) {
            //prevents numbers from breaking display
            return;
        } 
        mainDisplay.textContent += event.key;
    } 
}, false);