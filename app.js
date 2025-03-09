let currentInput = "";
let previousInput = "";
let operation = null;
let history = [];

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById("display");
    display.value = currentInput || "0";
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operation = null;
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = "";
}

function calculate() {
    if (operation === null || currentInput === "" || previousInput === "") return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operation) {
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
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        case "**":
            result = Math.pow(num1, num2);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    addToHistory(`${num1} ${operation} ${num2} = ${result}`);
    operation = null;
    previousInput = "";
    updateDisplay();
}

// Funciones avanzadas
function calculateSquareRoot() {
    if (currentInput === "") return;
    const num = parseFloat(currentInput);
    currentInput = Math.sqrt(num).toString();
    updateDisplay();
}

function calculatePower() {
    if (currentInput === "") return;
    previousInput = currentInput;
    operation = "**";
    currentInput = "";
}

function calculateSquare() {
    if (currentInput === "") return;
    const num = parseFloat(currentInput);
    currentInput = Math.pow(num, 2).toString();
    updateDisplay();
}

function calculateReciprocal() {
    if (currentInput === "") return;
    const num = parseFloat(currentInput);
    currentInput = (num !== 0 ? (1 / num).toString() : "Error");
    updateDisplay();
}

// Historial
function addToHistory(entry) {
    history.push(entry);
    const historyList = document.getElementById("history");
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = entry;
    historyList.appendChild(listItem);
}

function toggleHistory() {
    const historyContainer = document.getElementById("history-container");
    historyContainer.classList.toggle("d-none");
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    // Verifica si es un número
    if (!isNaN(key)) {
        appendNumber(key);
    }

    if (key === "+") setOperation("+");
    if (key === "-") setOperation("-");
    if (key === "*") setOperation("*");
    if (key === "/") setOperation("/");

    if (key === "Enter") calculate();

    if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }

    if (key === "Escape") clearDisplay();
});