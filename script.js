    const displayElem = document.querySelector('.display');
    const calcContainer = document.querySelector('.calculator-wrapper');

    let firstOperand = '';
    let secondOperand = '';
    let currentOperand = 'first';
    let operator = null;


    calcContainer.addEventListener('mousedown', (e) => {
        
        if (!isFromButton(e)) return;

        let value = e.target.dataset.value;
        

        // hundel numbers 
        if (isNumber(value)) {
            updateOperand(value);
            updateDisplay();
        }

        // hundel operators
        if (isOperator(value)) {
            if (firstOperand === '' && operator !== null) return;
            setOperator(value);
            switchOperand();
            clearDisplay();
        }
        

        // make operations 
        if (value === "operate") {
            const res = operate(firstOperand, secondOperand, operator);
            clearDisplay();
            displayElem.value = res;        
        }
            
        // make operations 
        if (value === "undo") {
            undo();
            updateDisplay();
        }

        // make operations 
        if (value === "clear") {
            clear();
        }

        // make operations 
        if (value === "clear") {
            clearDisplay();
        }
    })

    function updateOperand(value) {
        if(currentOperand === 'first') {
            firstOperand += value;
            
        } else if (currentOperand === 'second') {
            secondOperand += value;          
        }
    }

    function operate(a, b, operator) {

        let res = null;

        switch(operator) {
            case '+':
            res = add(a, b);
            break;

            case '/':
            res = divid(a, b);
            break;

            case '-':
            res = substract(a, b);
            break;

            case '*':
            res = multiply(a, b);
            break;
        }

        return res;
    }

    function isNumber(value) {
        return /^\d+$/.test(value);
    }


    // basic math functions 
    function add(a, b) {
        return +a + +b;
    }

    function substract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divid(a, b) {
        return a / b;
    }

    function updateDisplay() {
        if(currentOperand === 'first') {
            displayElem.value = firstOperand;
        } else if (currentOperand === 'second') {
            displayElem.value = secondOperand;
        }
    }

    function clearDisplay() {
        if (currentOperand === 'first') {
        firstOperand = '';
        } else if (currentOperand === 'second') {
            secondOperand = '';
        }
        updateDisplay();
    }

    function undo() {
        if (currentOperand === 'first') {
            firstOperand = firstOperand.slice(0, -1);
        } else if (currentOperand === 'second') {
            secondOperand = secondOperand.slice(0, -1);   
        }
    }

    function isOperator(value) {
        const operators = ['+', '-', '*', '/'];
        return operators.includes(value);
    }

    function switchOperand() {
        if (currentOperand === 'first') {
        currentOperand = 'second';
        } else if (currentOperand === 'second') {
            currentOperand = 'first';
        }
    }

    function setOperator(value) {
        operator = value;
    }

    function isFromButton(event) {
        return event.target.closest('button');
    }

    function clear() {
        firstOperand = '';
        secondOperand = '';
        operator =  null;
        currentOperand = 'first';
        clearDisplay();
    }