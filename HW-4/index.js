const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const daytime = 0.6
const nighttime = 0.4
const powerlineStats = powerlineStatsGen();

const houses = {
    houseAmount: getRandomNum(200, 501),
    dayPowerCons: 0.004,
    nightPowerCons: 0.001,
    apartmentAmount: 0,
};

const solarPanels = {
    amount: getRandomNum(1, 31),
    maxPower: 5,
    production: [],
};

const elStations = {
    amount: getRandomNum(1, 16),
    maxPower: 100,
    production: [],
};

const getArraySum = (array) => {
    return array.reduce((prevValue, currValue) => prevValue + currValue);
};

//generating stats for entities
function statGenerator(amount, min, max) {
    let initialArray = [];
    for (let i = 0; i < amount; i++) {
        initialArray.push(getRandomNum(min, max));
    }
    return initialArray;
}

//getting leftover energy after supplying apartments for day and night individually, considering daytime being 0.6 of the full day, and nighttime being 0.4
function getDayEnergyLeftovers() {
    const dayCons = (houses.apartmentAmount * houses.dayPowerCons).toFixed(3);
    const dayProd = (solarPanels.production + elStations.production * daytime).toFixed(3);
    const dayLeftovers = parseFloat((dayProd - dayCons).toFixed(3));
    return dayLeftovers;
}

function getNightEnergyLeftovers() {
    const nightCons = (houses.apartmentAmount * houses.nightPowerCons).toFixed(3);
    const nightProd = (elStations.production * nighttime).toFixed(3);
    const nightLeftovers = parseFloat((nightProd - nightCons).toFixed(3));
    return nightLeftovers;
}

function powerlineStatsGen () {
    const amount = getRandomNum(1, 25)
    let statArray = [];
    for (let i = 0; i < amount; i++) {
        statArray.push({power: getRandomNum(1, 16), price: getRandomNum(500, 1001)})
    }
    return statArray;
}

//adding stats to corresponding objects
houses.apartmentAmount = getArraySum(statGenerator(houses.houseAmount, 1, 401))
solarPanels.production = getArraySum(statGenerator(solarPanels.amount, 1, solarPanels.maxPower))
elStations.production = getArraySum(statGenerator(elStations.amount, 1, elStations.maxPower))

const dayEnergyMargin = getDayEnergyLeftovers();
const nightEnergyMargin = getNightEnergyLeftovers();

function calculateDelta(energyMargin, arr) {
    let absoluteMargin = Math.abs(energyMargin)
    let delta = 0;
    for (let i = 0; i < arr.length; i++) {
        if (absoluteMargin <= arr[i].power) {

            delta += absoluteMargin * arr[i].price;
            return {delta, energyMargin: 0 };
        }
        delta += arr[i].price * arr[i].power;

        absoluteMargin -= arr[i].power;
    }

    return {delta, energyMargin: absoluteMargin};
}

//optimizing for best deals using sort
function economyHandler(energyMargin) {
    if (energyMargin > 0) {
        return calculateDelta(energyMargin, powerlineStats.sort((a, b) => a.price - b.price))
    }
    if (energyMargin < 0) {
        const calculationResult = calculateDelta(energyMargin, powerlineStats.sort((a, b) => b.price - a.price));
        return {delta: -calculationResult.delta, energyMargin: -calculationResult.energyMargin }
    } else {
        return "Somehow we didn't produce any energy."
    }
}

console.groupCollapsed(`CITY STATS:`);
console.log(`HOUSE STATS:`)
console.table(houses);
console.log(`SOLAR PANEL STATS:`)
console.table(solarPanels);
console.log(`POWER STATION STATS:`)
console.table(elStations);
console.log(`POWERLINE STATS:`)
console.table(powerlineStats);
console.groupEnd();

const daytimeCalculationResult = economyHandler(dayEnergyMargin);
const nightimeCalculationResult = economyHandler(nightEnergyMargin);

const renderResults = (accountedData) => {
    const {delta, energyMargin} = accountedData;
    if (delta < 0) {
        console.log(`After buying energy, we are in the red: ${delta} HRN`);
    }
    if (delta > 0) {
        console.log(`After selling energy, we are in the green: ${delta} HRN`);
    }
    if (delta === 0) {
        console.log(`Nothing lost or gained: ${delta} HRN`);
    }
    if(energyMargin < 0) {
        console.log(`Out of powerlines, we still need to buy energy: ${energyMargin} MWt`);
    }
    if(energyMargin > 0) {
        console.log(`Out of powerlines, but we can sell energy: ${energyMargin} MWt`);
    }
    if(energyMargin === 0) {
        console.log(`We can't do any better, all energy has been accounted for: ${energyMargin} MWt`);
    }
}
console.groupCollapsed(`DAY REPORT: `)
console.log(`Amount of leftover power during daytime: ${getDayEnergyLeftovers()} MWt`);
renderResults(daytimeCalculationResult);
console.groupEnd();
console.groupCollapsed(`NIGHT REPORT: `)
console.log(`Amount of leftover power during nighttime: ${getNightEnergyLeftovers()} MWt`);
renderResults(nightimeCalculationResult);
console.groupEnd();

