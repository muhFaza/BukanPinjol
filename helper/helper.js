const bcrypt = require("bcryptjs");

function generateAccountNo() {
  const length = 5;
  const min = Math.pow(10, length - 1); // Minimum value with 5 digits
  const max = Math.pow(10, length) - 1; // Maximum value with 5 digits
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatCurrencyIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}
function formatCurrencyUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
function formatCurrencyGBP(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

function decideType(amount, currentType) {
  let type;
  if (amount < 100000) {
    type = 1;
  } else if (amount < 1000000) {
    type = 2;
  } else if (amount < 2500000) {
    type = 3;
  } else if (amount < 5000000) {
    type = 4;
  } else {
    type = 5;
  }
  if (type > currentType) {
    return type;
  } else {
    return currentType;
  }
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}
function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

// const CC = require('currency-converter-lt')
// new CC({from:"IDR", to:"GBP", amount:100000}).convert()
// .then(data => {
//     console.log(formatCurrencyGBP(data));
// })

module.exports = {
  generateAccountNo,
  formatCurrencyIDR,
  formatCurrencyUSD,
  formatCurrencyGBP,
  decideType,
  hashPassword,
  comparePassword,
};
