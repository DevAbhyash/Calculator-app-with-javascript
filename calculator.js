const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
);

class Calculator {
    constructor(currentOperandTextElement, previousOperandTextElement) {
            this.currentOperandTextElement = currentOperandTextElement;
            this.previousOperandTextElement = previousOperandTextElement;
            this.clear();
        }
        //clearing all the element from current operand
    clear() {
            this.currentOperand = "";
            this.previousOperand = "";
            this.operand = undefined;
        }
        //appending all the number with one another
    append(nums) {
            if (this.currentOperand.includes(".") && nums === ".") return;
            this.currentOperand = this.currentOperand.toString() + nums.toString();
        }
        //doing all the required operation
    operation(operation) {
            if (this.currentOperand === "") return;
            if (this.previousOperand !== "") {
                this.compute();
            }
            this.operand = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = "";
        }
        //computing all the code using switch condition
    compute(comp) {
            let computation = 0;
            let cur = parseFloat(this.currentOperand);
            let pre = parseFloat(this.previousOperand);
            switch (this.operand) {
                case "+":
                    computation = pre + cur;
                    break;
                case "-":
                    computation = pre - cur;
                    break;
                case "*":
                    computation = pre * cur;
                    break;
                case "/":
                    computation = pre / cur;
                    break;

                default:
                    break;
            }

            this.currentOperand = computation;
            this.previousOperand = "";
        }
        //deleting each element from the current operadn
    delete() {
            console.log(typeof this.currentOperand);
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
        //updating the display from the calculator...must be called each time when the key mentioned in add event listener is pressed and executed...
    updateDisplay() {
        this.currentOperandTextElement.innerHTML = this.currentOperand;
        this.previousOperandTextElement.innerHTML = this.previousOperand;
    }
}
//creating the calcultor object instances using calculator class.
const calculator = new Calculator(
    currentOperandTextElement,
    previousOperandTextElement
);

numberButtons.forEach((nums) => {
    nums.addEventListener("click", () => {
        calculator.append(nums.innerText);
        calculator.updateDisplay();
    });
});
operationButtons.forEach((oper) => {
    oper.addEventListener("click", () => {
        calculator.operation(oper.innerText);
        calculator.updateDisplay();
    });
});
equalsButton.addEventListener("click", () => {
    calculator.compute(equalsButton.innerText);
    calculator.updateDisplay();
});
allClearButton.addEventListener("click", function() {
    calculator.clear();
    calculator.updateDisplay();
});
deleteButton.addEventListener("click", function() {
    calculator.delete();
    calculator.updateDisplay();
});