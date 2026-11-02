const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';
let previousInput = '';
let operator = null;
let resetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

keys.addEventListener('click', (event) => {
    const target = event.target;
    
    if (!target.classList.contains('btn')) return;

    if (target.hasAttribute('data-number')) {
        handleNumber(target.getAttribute('data-number'));
    }

    if (target.classList.contains('operator') && target.getAttribute('data-action') !== 'calculate') {
        handleOperator(target.getAttribute('data-action'));
    }

    if (target.getAttribute('data-action') === 'calculate') {
        calculate();
    }

    if (target.getAttribute('data-action') === 'clear') {
        clearCalculator();
    }

    if (target.getAttribute('data-action') === 'percentage') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }

    if (target.getAttribute('data-action') === 'decimal') {
        inputDecimal();
    }
});

function handleNumber(num) {
    if (currentInput === '0' || resetDisplay) {
        currentInput = num;
        resetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (resetDisplay) {
        currentInput = '0.';
        resetDisplay = false;
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && resetDisplay) {
        operator = nextOperator;
        return;
    }

    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        const result = operate(previousInput, inputValue, operator);
        previousInput = result;
        currentInput = String(result);
        updateDisplay();
    }

    operator = nextOperator;
    resetDisplay = true;
}

function operate(first, second, op) {
    if (op === 'add') return first + second;
    if (op === 'subtract') return first - second;
    if (op === 'multiply') return first * second;
    if (op === 'divide') return second === 0 ? 'Error' : first / second;
    return second;
}

function calculate() {
    let result = 0;
    const secondValue = parseFloat(currentInput);
    const firstValue = parseFloat(previousInput);

    if (!operator || resetDisplay) return;

    result = operate(firstValue, secondValue, operator);

    currentInput = String(result);
    previousInput = '';
    operator = null;
    resetDisplay = true;
    updateDisplay();
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    resetDisplay = false;
    updateDisplay();
}