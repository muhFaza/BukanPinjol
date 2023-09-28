type 1 : min balance 0
type 2 : min balance 100k
type 3 : min balance 1jt
type 4 : min balance 2.5
type 5 : min balance 5

hanya type 3-5 yang canBuyShares = true

===================================================
Cara pake package currency-converter-lt
```
const CC = require('currency-converter-lt')

let currencyConverter = new CC({from:"USD", to:"IDR", amount:100}).convert()
.then(res => {
    console.log(res);
})

OR

currencyConverter.from("USD").to("GBP").amount(125).convert().then((res) => {
    console.log(res)
})
```
===================================================

Password min 6 length
Username min 3 length
Username only alphanumeric