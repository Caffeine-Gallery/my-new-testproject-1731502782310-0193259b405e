import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let loader = document.getElementById('loader');

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    try {
        loader.style.display = 'block';
        const expression = display.value;
        const [num1, operator, num2] = expression.match(/(-?\d+\.?\d*)\s*([\+\-\*\/])\s*(-?\d+\.?\d*)/).slice(1);

        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(num1), parseFloat(num2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case '/':
                result = await backend.divide(parseFloat(num1), parseFloat(num2));
                break;
            default:
                throw new Error('Invalid operator');
        }

        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    } finally {
        loader.style.display = 'none';
    }
};
