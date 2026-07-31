const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldReset = false;

buttons.forEach(button => {
    button.addEventListener("click", () => handleButton(button.textContent));
});

function handleButton(value) {

    if (!isNaN(value) || value === ".") {
        inputNumber(value);
    }

    else if (["+", "-", "*", "/"].includes(value)) {
        chooseOperator(value);
    }

    else if (value === "=") {
        calculate();
    }

    else if (value === "C") {
        clearDisplay();
    }

    else if (value === "⌫") {
        backspace();
    }
}

function inputNumber(num) {

    if (shouldReset) {
        display.value = "";
        shouldReset = false;
    }

    if (num === "." && display.value.includes(".")) return;

    display.value += num;
}

function chooseOperator(op) {

    if (display.value === "") return;

    if (firstNumber !== "" && !shouldReset) {
        calculate();
    }

    firstNumber = display.value;
    operator = op;
    shouldReset = true;
}

function calculate() {

    if (firstNumber === "" || operator === "" || display.value === "") return;

    secondNumber = display.value;

    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);
    let result;

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if (num2 === 0) {
                display.value = "Error";
                firstNumber = "";
                secondNumber = "";
                operator = "";
                return;
            }
            result = num1 / num2;
            break;
    }

    display.value = result;
    firstNumber = result;
    operator = "";
    shouldReset = true;
}

function clearDisplay() {
    display.value = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    shouldReset = false;
}

function backspace() {

    if (shouldReset) return;

    display.value = display.value.slice(0, -1);
}