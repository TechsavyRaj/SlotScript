const prompt = require('prompt-sync')();
const TOTALSLOTS = 3;
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
    E: 10,
};
const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
};

const getDepositAmount = () => {
    const depositAmount = parseFloat(prompt('Enter the amount you want to deposit: '));
    if (isNaN(depositAmount) || depositAmount < 1) {
        console.log("Invalid deposit amount, please try again.");
        return getDepositAmount();
    }
    return depositAmount;
}

const getNumberOfSlots = () => {
    const numberOfSlots = parseInt(prompt('Enter the number of slots (1-' + TOTALSLOTS + '): '));
    if (isNaN(numberOfSlots) || numberOfSlots < 1 || numberOfSlots > TOTALSLOTS) {
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

const spin = () => {
    let symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    // const reels = Array.from({ length: ROWS }, () => {
    //     return Array.from({ length: COLS }, () => {
    //         const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    //         return randomSymbol;
    //     });
    // });

    const reels = [];
    for (let i = 0; i < ROWS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < COLS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            reels[i].push(reelSymbols[randomIndex]);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};

const transpose = (reels) => {
    const transposed = [];
    for (let i = 0; i < COLS; i++) {
        transposed.push([]);
        for (let j = 0; j < ROWS; j++) {
            transposed[i].push(reels[j][i]);
        }
    }
    return transposed;
}

const printRows = (rows) => {
    for (let i = 0; i < rows.length; i++) {
        console.log(rows[i].join(' | '));
    }
}

const getWinnings = (rows, rowsChosen, betAmount) => {
    let winnings = 0;
    for (let row = 0; row < rowsChosen; row++) {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol !== symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += betAmount * SYMBOLS_VALUES[symbols[0]];
        }

    }
    return winnings;
}


// Main game loop
const gameLoop = () => {
    console.log("Welcome to the Slot Machine Game!");
    let depositedAmount = getDepositAmount();
    while (true) {
        const rowsChosen = getNumberOfSlots();
        const betPerSlot = getBetPerSlot(depositedAmount, rowsChosen);
        // console.log(`You have deposited $${depositedAmount}, chosen ${rowsChosen} slots, and bet $${betPerSlot} per slot.`);
        console.log(`Your total bet amount is $${betPerSlot * rowsChosen}.`);
        depositedAmount -= betPerSlot * rowsChosen;
        const reels = spin();
        const transposedReels = transpose(reels);
        printRows(transposedReels);
        const winnings = getWinnings(transposedReels, rowsChosen, betPerSlot);
        console.log(`You won $${winnings}!`);
        depositedAmount += winnings;
        if (depositedAmount <= 0) {
            console.log("You have no money left. Game over!");
            return;
        }
        console.log(`You have $${depositedAmount} left after betting.`);
        const playAgain = prompt('Do you want to play again? (y/n): ').toLowerCase();
        if (playAgain !== 'y') {
            console.log("Thank you for playing! Goodbye!");
            break;
        }
    }
}

gameLoop();