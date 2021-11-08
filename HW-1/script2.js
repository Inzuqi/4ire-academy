//variant 2. Using methods, objects and a function.
const currenciesPricesInUSD = {
  UAH: 26.25,
  EUR: 0.86,
  RUB: 71.69,
  YEN: 113.66,
  USD: 1,
};

const convertCurrency = () => {
  let currencyToExchange = window.prompt(
    'Enter currency name you want to exchange: UAH, EUR, RUB, YEN, USD'
  );
  while (!currenciesPricesInUSD[currencyToExchange]) {
    currencyToExchange = window.prompt(
      'Currency name is not valid, enter valid currency name: UAH, EUR, RUB, YEN, USD'
    );
  }
  let amountToExchange = window.prompt('Enter the amount you want to exchange');
  while (Number(amountToExchange) <= 0 && isNaN(amountToExchange)) {
    amountToExchange = window.prompt(
      'Enter a valid amount you want to exchange (more than 0, not a string)'
    );
  }
  let currencyExchangeInto = window.prompt(
    'Enter currency name you want to exchange into'
  );
  while (!currenciesPricesInUSD[currencyExchangeInto]) {
    currencyExchangeInto = window.prompt(
      'Currency name is invalid, enter valid currency name: UAH, EUR, RUB, YEN, USD'
    );
  }

  alert(
    `For ${amountToExchange} ${currencyToExchange}, you'll get ${
      (amountToExchange * currenciesPricesInUSD[currencyExchangeInto]) /
      currenciesPricesInUSD[currencyToExchange]
    } ${currencyExchangeInto}.`
  );
};
