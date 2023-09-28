function generateAccountNo() {
    const length = 5
    const min = Math.pow(10, length - 1); // Minimum value with 5 digits
    const max = Math.pow(10, length) - 1; // Maximum value with 5 digits
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



module.exports = { generateAccountNo }