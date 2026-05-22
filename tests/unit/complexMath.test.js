const {
    addComplexNumbers,
    subtractComplexNumbers,
    multipyComplexNumbers,
    divideComplexNumbers
} = require('../../src/compleMath');

describe('Complex Math Operations', () => {
    test('Addition of complex numbers', () => {
        expect(addComplexNumbers({ real: 1, imag: 2 }, { real: 3, imag: 4 })).toEqual({ real: 4, imag: 6 });
    });
    test('Subtraction of complex numbers', () => {
        expect(subtractComplexNumbers({ real: 1, imag: 2 }, { real: 3, imag: 4 })).toEqual({ real: -2, imag: -2 });
    });
    test('Multiplication of complex numbers', () => {
        expect(multipyComplexNumbers({ real: 1, imag: 2 }, { real: 3, imag: 4 })).toEqual({ real: -5, imag: 10 });
    });
    test('Division of complex numbers', () => {
        expect(divideComplexNumbers({ real: 1, imag: 2 }, { real: 3, imag: 4 })).toEqual({ real: 0.44, imag: 0.08 });
    });
});