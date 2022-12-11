// Instnatiate operands and operators
let firstNumber = 0
let secondNumber = 0
let operator = null
// Variable to check if last key pressed is an operator
let operatorActive = false
// Variable to check if lastKey was percentage
let percentageActive = false

// Set Array of operators for dynamic addevent listener
const operators = ['/','*','-','+']
// Get display DOM Element
const inputDisplay = document.getElementById('display');
// Get equal button
const equalButton = document.getElementById('=')
// Get AC button
const acButton = document.getElementById('ac')
// Get Backspace button
const deleteButton = document.getElementById('del')
// Get Percentage button
const percentageButton = document.getElementById('percent')
// Get Decimal button
const decimalButton = document.getElementById('decimal')

// FUNCTIONS
function setDisplay(value){
    inputDisplay.innerHTML = value
}

function operate (numA,numB,operator) {
    switch (operator) {
        case ('+'): {
            return numA + numB
        }
        case ('/'): {
            return numA / numB
        }
        case ('-'): {
            return numA - numB
        }
        case ('*'): {
            return numA * numB
        }
        default: {
            return 0
        }
    }
}

function typeNumber (value) {
    if (!operatorActive && !percentageActive) {
        if (inputDisplay.innerHTML === '0') {
            setDisplay(value)
        } else {
            setDisplay(inputDisplay.innerHTML + value)
        }
    } else {
        setDisplay(value)
        operatorActive = false
        percentageActive = false
    }
}

function calculate(numA,numB,operand) {
    const result = operate(numA,numB,operand)
    setDisplay(result)
    firstNumber = result
    operatorActive = true
    operator = null
}

function typeOperator(op) {
    const displayValue = parseFloat(inputDisplay.innerHTML)
    // If second operator
    if (operator && !operatorActive) {
        calculate(firstNumber, displayValue, operator)
    } else {
        firstNumber = displayValue
    }
    operator = op
    operatorActive = true
}

// EVENT LISTENERS
equalButton.addEventListener('click',() => {
    if (!operatorActive && operator !== null) {
        secondNumber = parseFloat(inputDisplay.innerHTML)
        calculate(firstNumber,secondNumber,operator)
    }
})

acButton.addEventListener('click',() => {
    firstNumber = 0
    secondNumber = null
    operator = null
    operatorActive= false
    setDisplay(0)
})

deleteButton.addEventListener('click',() =>{
    if (operatorActive || inputDisplay.innerHTML.length === 1  ) {
        setDisplay(0)
    } else {
        setDisplay(inputDisplay.innerHTML.slice(0,-1))
    }
})

percentageButton.addEventListener('click',() => {
    setDisplay(parseFloat(inputDisplay.innerHTML) /100)
    percentageActive = true
})

decimalButton.addEventListener('click',() => {
    if (operatorActive) {
        setDisplay('0.')
        operatorActive= false
    } else if (inputDisplay.innerHTML.indexOf('.') === -1) {
        setDisplay(inputDisplay.innerHTML + '.')
    }

})

// Add event listener to numbers
for (let i = 0; i < 10; i++) {
    const element = document.getElementById(`number-${i}`)
    element.addEventListener('click', () => typeNumber(i))
}

// Event Listeners to operators
operators.forEach((operator) => {
    const element = document.getElementById(operator)
    element.addEventListener('click', () => {
        typeOperator(operator)
    })
})

// keyboard support
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});