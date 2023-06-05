const screenValue = document.querySelector(".screen-value");
let lastOperator = null;
let buffer = "0";
let runningTotal = 0;

initCalculator();

function onReset() {
    lastOperator = null;
    buffer = "0";
}

function initCalculator() {
    document
        .querySelector(".calc-buttons")
        .addEventListener("click", function (event) {
            onButtonClicked(event.target.innerText);
        });
}

function onButtonClicked(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    render();
}

function handleSymbol(symbol) {
    switch (symbol) {
        case "C":
            onReset();
            break;
        case "←":
            onBack();
            break;
        case "+":
        case "÷":
        case "×":
        case "-":
            doMath(symbol);
            break;
        case "=":
            if (lastOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            lastOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        default:
            break;
    }
}
function handleNumber(value) {
    setState(value);
}

function onBack() {
    if (buffer.length === 1) {
        buffer = "0";
    } else {
        buffer = buffer.substring(0, buffer.length - 1);
    }
}

function render() {
    screenValue.innerText = buffer;
}
function setState(newState) {
    if (buffer === "0") {
        buffer = newState;
    } else {
        buffer += newState;
    }
}

function doMath(operator) {
    if (buffer === "0") return;

    const numberBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = numberBuffer;
    } else {
        flushOperation(numberBuffer);
    }
    console.log(runningTotal);
    lastOperator = operator;
    buffer = "0";
}

function flushOperation(number) {
    switch (lastOperator) {
        case "+":
            runningTotal += number;
            break;
        case "÷":
            runningTotal /= number;
            break;
        case "×":
            runningTotal *= number;
            break;
        case "-":
            runningTotal -= number;
            break;
        default:
            break;
    }
}
