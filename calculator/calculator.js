const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const backButton = document.querySelector(".back");
const screenValue = document.querySelector(".screen-value");

bindButtons();

function bindButtons() {
    numberButtons.forEach((b) => {
        b.addEventListener("click", (e) => {
            console.log(e.target.innerText);
            console.log(typeof toNumber(e.target.innerText));
            screenValue.innerText = e.target.innerText;
        });
    });
}

function onOperatorClick(event) {
    console.log(event.target);
}
function plus() {}
function sum() {
    const number = Number.parseInt("");
}
function rest() {}
function multiply() {}
function divide() {}

function toString(number) {
    return number.toString();
}
function toNumber(string) {
    return parseInt(string);
}
