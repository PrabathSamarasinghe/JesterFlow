const addComplexNumbers = (a, b) => {
    return {
        real: a.real + b.real,
        imag: a.imag + b.imag
    };
}

const subtractComplexNumbers = (a, b) => {
    return {
        real: a.real - b.real,
        imag: a.imag - b.imag
    };
}

const multipyComplexNumbers = (a, b) => {
    return {
        real: a.real * b.real - a.imag * b.imag,
        imag: a.real * b.imag + a.imag * b.real
    };
}

const divideComplexNumbers = (a, b) => {
    const denominator = b.real * b.real + b.imag * b.imag;
    return {
        real: (a.real * b.real + a.imag * b.imag) / denominator,
        imag: (a.imag * b.real - a.real * b.imag) / denominator
    };
}

module.exports = {
    addComplexNumbers,
    subtractComplexNumbers,
    multipyComplexNumbers,
    divideComplexNumbers
};