const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const backButton = document.querySelector(".back");
const resetButton = document.querySelector(".reset");
const screenValue = document.querySelector(".screen-value");
const resultButton = document.querySelector(".result");
let stateA = [];
let stateB = [];
let lastOperator = "";

onReset();
bindButtons();

function onReset() {
    stateA = [];
    stateB = [];
    lastOperator = "";
}

function bindButtons() {
    numberButtons.forEach((numberButton) => {
        numberButton.addEventListener("click", (e) => {
            const numString = e.target.innerText;
            // console.log(numString);
            // console.log(typeof toNumber(numString));
            setState(numString);
        });
    });
    operatorButtons.forEach((operatorButton) => {
        operatorButton.addEventListener("click", (event) => {
            onOperatorChanged(event.target.innerText);
        });
    });
    resetButton.addEventListener("click", () => {
        onReset();
        render();
    });
    backButton.addEventListener("click", () => onBack());
    resultButton.addEventListener("click", () =>
        doMath(lastOperator, stateA, stateB)
    );
}

function onBack() {
    let actualState = getStateArray();
    if (actualState.length > 0) {
        actualState = actualState.pop();
    }
    render(toStringState(getStateArray()));
}

function render(newState = "0") {
    screenValue.innerText = newState;
}
function setState(newState) {
    getStateArray().push(newState);
    const stringNumbers = getStateArray().join("");
    render(stringNumbers);
}

function getStateArray() {
    return lastOperator === "" ? stateA : stateB;
}

function sum(numA, numB) {
    return numA + numB;
}
function rest(numA, numB) {
    return numA - numB;
}
function multiply(numA, numB) {
    return numA * numB;
}
function divide(numA, numB) {
    return numA / numB;
}

function toStringState(state) {
    return state.toString();
}
function toNumberState(state) {
    return state.length > 0 ? parseInt(state.join("")) : 0;
}

function onOperatorChanged(operator) {
    // console.log(`Operator clicked ! -> ${operator}`);
    lastOperator = operator;
}

function doMath(operator, stateA, stateB) {
    if (operator === "") return;
    let result;
    console.log(` lets do ${stateA} ${operator} ${stateB}`);
    const numA = toNumberState(stateA);
    const numB = toNumberState(stateB);
    switch (operator) {
        case "+":
            result = sum(numA, numB);
            break;
        case "÷":
            result = divide(numA, numB);
            break;
        case "×":
            result = multiply(numA, numB);
            break;
        case "-":
            result = rest(numA, numB);
            break;
        default:
            break;
    }
    render(toStringState(result));
    onReset();
}
