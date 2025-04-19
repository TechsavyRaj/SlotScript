const prompt = require('prompt-sync')();
const totalSlots = 3;

const getDepositAmount = () => {
    const depositAmount = parseFloat(prompt('Enter the amount you want to deposit: '));
    if (isNaN(depositAmount) || depositAmount < 1) {
        console.log("Invalid deposit amount, please try again.");
        return getDepositAmount();
    }
    return depositAmount;
}

const getNumberOfSlots = () => {
    const numberOfSlots = parseInt(prompt('Enter the number of slots (1-' + totalSlots + '): '));
    if (isNaN(numberOfSlots) || numberOfSlots < 1 || numberOfSlots > totalSlots) {
        console.log("Invalid number of slots, please try again.");
        return getNumberOfSlots();
    }
    return numberOfSlots;
}

const getBetPerSlot = (depositedAmount, numberOfSlots) => {
    const betAmount = parseFloat(prompt('Enter the amount you want to bet per slot: '));
    if (isNaN(betAmount) || betAmount < 1 || betAmount > depositedAmount / numberOfSlots) {
        console.log("Invalid bet amount, please try again.");
        return getBetPerSlot(depositedAmount, numberOfSlots);
    }
    return betAmount;
}

let depositedAmount = getDepositAmount();
let slotsChosen = getNumberOfSlots();
let totalBetAmount = getBetPerSlot(depositedAmount, slotsChosen);

console.log(`You have deposited $${depositedAmount}, chosen ${slotsChosen} slots, and bet $${totalBetAmount} per slot.`);
