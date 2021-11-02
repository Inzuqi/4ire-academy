// variant 1. No methods, no functions, only conditionals and loops.
let amountExchangedInUSD, 
exchangedName,
targetCurrency,
currAmount,
exchangePrompt,

const UAH = 26.25,
EUR = 0.86,
RUB = 71.69,
YEN = 113.66,

do{
  exchangedName = prompt(
    'Enter the name of the currency you want exchanged. Supported currencies: UAH, USD, EUR, RUB, YEN'
  );

  while (
    exchangedName !== 'UAH' &&
    exchangedName !== 'USD' &&
    exchangedName !== 'EUR' &&
    exchangedName !== 'RUB' &&
    exchangedName !== 'YEN'
  ) {
    exchangedName = prompt('Invalid input! Try: UAH, USD, EUR, RUB, YEN');
  }

  targetCurrency = prompt(
    'Enter the name of the currency you are exchanging for. Supported currencies: UAH, USD, EUR, RUB, YEN'
  );

  while (
    targetCurrency !== 'UAH' &&
    targetCurrency !== 'USD' &&
    targetCurrency !== 'EUR' &&
    targetCurrency !== 'RUB' &&
    targetCurrency !== 'YEN'
  ) {
    targetCurrency = prompt('Invalid input! Try: UAH, USD, EUR, RUB, YEN');
  }

  currAmount = Number(
    prompt('Input the amount you want exchanged. Has to be more than 0')
  );


  while (currAmount && currAmount < 0) {
    currAmount = prompt('Invalid input! Has to be a number higher than 0.');
  }
switch (targetCurrency) {
    case 'UAH':
        amountExchangedInUSD = currAmount * UAH;
        break;
    case 'EUR':
        amountExchangedInUSD = currAmount * EUR;
        break;
    case 'RUB':
        amountExchangedInUSD = currAmount * RUB;
        break;
    case 'YEN':
        amountExchangedInUSD = currAmount * YEN;
        break;
    case 'USD':
        amountExchangedInUSD = currAmount;
  }
if (exchangedName =='UAH'){
    alert(`For ${currAmount} ${exchangedName}, you'll get ${amountExchangedInUSD / UAH} ${targetCurrency}.`);
} else if (exchangedName == 'EUR'){
    alert(`For ${currAmount} ${exchangedName}, you'll get ${amountExchangedInUSD / EUR} ${targetCurrency}.`);
} else if (exchangedName == 'RUB'){
    alert(`For ${currAmount} ${exchangedName}, you'll get ${amountExchangedInUSD / RUB} ${targetCurrency}.`);
}else if (exchangedName == 'USD'){
    alert(`For ${currAmount} ${exchangedName}, you'll get ${amountExchangedInUSD / currAmount} ${targetCurrency}.`);
} else {
    alert(`For ${currAmount} ${exchangedName}, you'll get ${amountExchangedInUSD / YEN} ${targetCurrency}.`);
}
  exchangePrompt = confirm('Do you want to exchange currencies again?');
}
while (exchangePrompt);