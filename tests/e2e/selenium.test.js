const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const path = require('path');

// Helper function to add delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

describe('Calculator Frontend - Selenium Tests', () => {
    let driver;

    beforeAll(async () => {
        // Setup Edge driver with options
        const options = new edge.Options();
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        
        driver = await new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .build();
    }, 60000);  // 60 second timeout for setup

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    beforeEach(async () => {
        // Navigate to the calculator page
        await driver.get('http://localhost:3000');
        // Wait for the form to be visible
        await driver.wait(
            until.elementLocated(By.id('calculatorForm')),
            5000
        );
    });

    test('should load the calculator page with all elements', async () => {
        // Check if the title is correct
        const title = await driver.getTitle();
        expect(title).toBe('Simple Calculator');

        // Check if form elements are present
        const num1Input = await driver.findElement(By.id('num1'));
        const num2Input = await driver.findElement(By.id('num2'));
        const operationSelect = await driver.findElement(By.id('operation'));
        const calculateBtn = await driver.findElement(By.id('calculateBtn'));

        expect(num1Input).toBeTruthy();
        expect(num2Input).toBeTruthy();
        expect(operationSelect).toBeTruthy();
        expect(calculateBtn).toBeTruthy();
    });

    test('should perform addition correctly', async () => {
        const num1Input = await driver.findElement(By.id('num1'));
        const num2Input = await driver.findElement(By.id('num2'));
        const operationSelect = await driver.findElement(By.id('operation'));
        const calculateBtn = await driver.findElement(By.id('calculateBtn'));

        await num1Input.sendKeys('5');
        await sleep(500);
        await num2Input.sendKeys('3');
        await sleep(500);
        await operationSelect.sendKeys('Add (+)');
        await sleep(500);
        await calculateBtn.click();
        await sleep(1000);

        // Wait for result to appear
        await driver.wait(
            until.elementLocated(By.id('result')),
            5000
        );

        const resultValue = await driver.findElement(By.id('resultValue'));
        const resultText = await resultValue.getText();

        expect(resultText).toBe('8.00');
    });

    test('should perform subtraction correctly', async () => {
        const num1Input = await driver.findElement(By.id('num1'));
        const num2Input = await driver.findElement(By.id('num2'));
        const operationSelect = await driver.findElement(By.id('operation'));
        const calculateBtn = await driver.findElement(By.id('calculateBtn'));

        await num1Input.sendKeys('10');
        await sleep(500);
        await num2Input.sendKeys('4');
        await sleep(500);
        await operationSelect.sendKeys('Subtract (-)');
        await sleep(500);
        await calculateBtn.click();
        await sleep(1000);

        await driver.wait(
            until.elementLocated(By.id('result')),
            5000
        );

        const resultValue = await driver.findElement(By.id('resultValue'));
        const resultText = await resultValue.getText();

        expect(resultText).toBe('6.00');
    });

    test('should perform multiplication correctly', async () => {
        const num1Input = await driver.findElement(By.id('num1'));
        const num2Input = await driver.findElement(By.id('num2'));
        const operationSelect = await driver.findElement(By.id('operation'));
        const calculateBtn = await driver.findElement(By.id('calculateBtn'));

        await num1Input.sendKeys('6');
        await sleep(500);
        await num2Input.sendKeys('7');
        await sleep(500);
        await operationSelect.sendKeys('Multiply (*)');
        await sleep(500);
        await calculateBtn.click();
        await sleep(1000);

        await driver.wait(
            until.elementLocated(By.id('result')),
            5000
        );

        const resultValue = await driver.findElement(By.id('resultValue'));
        const resultText = await resultValue.getText();

        expect(resultText).toBe('42.00');
    });

    test('should perform division correctly', async () => {
        const num1Input = await driver.findElement(By.id('num1'));
        const num2Input = await driver.findElement(By.id('num2'));
        const operationSelect = await driver.findElement(By.id('operation'));
        const calculateBtn = await driver.findElement(By.id('calculateBtn'));

        await num1Input.sendKeys('20');
        await sleep(500);
        await num2Input.sendKeys('4');
        await sleep(500);
        await operationSelect.sendKeys('Divide (/');
        await sleep(500);
        await calculateBtn.click();
        await sleep(1000);

        await driver.wait(
            until.elementLocated(By.id('result')),
            5000
        );

        const resultValue = await driver.findElement(By.id('resultValue'));
        const resultText = await resultValue.getText();

        expect(resultText).toBe('5.00');
    });

    test('should handle division by zero error', async () => {
        const num1Input = await driver.findElement(By.id('num1'));
        const num2Input = await driver.findElement(By.id('num2'));
        const operationSelect = await driver.findElement(By.id('operation'));
        const calculateBtn = await driver.findElement(By.id('calculateBtn'));

        await num1Input.sendKeys('10');
        await sleep(500);
        await num2Input.sendKeys('0');
        await sleep(500);
        await operationSelect.sendKeys('Divide (/');
        await sleep(500);
        await calculateBtn.click();
        await sleep(1000);

        // Wait for error to appear
        await driver.wait(
            until.elementLocated(By.id('error')),
            5000
        );

        const errorMessage = await driver.findElement(By.id('errorMessage'));
        const errorText = await errorMessage.getText();

        expect(errorText).toBe('Cannot divide by zero');
    });

    test('should show error when operation is not selected', async () => {
        const num1Input = await driver.findElement(By.id('num1'));
        const num2Input = await driver.findElement(By.id('num2'));
        const calculateBtn = await driver.findElement(By.id('calculateBtn'));

        await num1Input.sendKeys('5');
        await sleep(500);
        await num2Input.sendKeys('3');
        await sleep(500);
        // Don't select an operation
        await calculateBtn.click();
        await sleep(1000);

        await driver.wait(
            until.elementLocated(By.id('error')),
            5000
        );

        const errorMessage = await driver.findElement(By.id('errorMessage'));
        const errorText = await errorMessage.getText();

        expect(errorText).toBe('Please select an operation');
    });

    test('should show error for invalid input', async () => {
        const calculateBtn = await driver.findElement(By.id('calculateBtn'));
        const operationSelect = await driver.findElement(By.id('operation'));

        // Don't fill in the number inputs
        await operationSelect.sendKeys('Add (+)');
        await sleep(500);
        await calculateBtn.click();
        await sleep(1000);

        await driver.wait(
            until.elementLocated(By.id('error')),
            5000
        );

        const errorMessage = await driver.findElement(By.id('errorMessage'));
        const errorText = await errorMessage.getText();

        expect(errorText).toBe('Please enter valid numbers');
    });
});
