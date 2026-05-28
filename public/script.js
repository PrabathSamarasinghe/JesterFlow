document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('calculatorForm');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const resultValue = document.getElementById('resultValue');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const num1 = parseFloat(document.getElementById('num1').value);
        const num2 = parseFloat(document.getElementById('num2').value);
        const operation = document.getElementById('operation').value;

        // Hide previous results/errors
        resultDiv.style.display = 'none';
        errorDiv.style.display = 'none';

        // Validate inputs
        if (isNaN(num1) || isNaN(num2)) {
            errorMessage.textContent = 'Please enter valid numbers';
            errorDiv.style.display = 'block';
            return;
        }

        if (!operation) {
            errorMessage.textContent = 'Please select an operation';
            errorDiv.style.display = 'block';
            return;
        }

        let result;
        try {
            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        throw new Error('Cannot divide by zero');
                    }
                    result = num1 / num2;
                    break;
                default:
                    throw new Error('Invalid operation');
            }

            resultValue.textContent = result.toFixed(2);
            resultDiv.style.display = 'block';
        } catch (error) {
            errorMessage.textContent = error.message;
            errorDiv.style.display = 'block';
        }
    });
});
