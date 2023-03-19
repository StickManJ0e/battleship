import Gameboard from './gameboard';

//Get a random integer with minimum and maximum limits
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let Player = (nameInput) => {
    let name = nameInput;
    let ships = [];
    let gameboard = Gameboard();
    let passAttacks = [];

    return {
        name,
        ships,
        gameboard,
        passAttacks,

        //If coordinates not already been hit, then attack
        attack(coordinates, enemyGameboard) {
            if (this.checkAlreadyHit(coordinates)) return false;

            this.passAttacks.push(coordinates);
            enemyGameboard.recieveAttack(coordinates);
        },

        //Get random coordinates until valid coordinates then attack
        randomAttack(enemyGameboard) {
            let xValue = getRandomNumber(1, 10);
            let yValue = getRandomNumber(1, 10);
            let randomCoordinates = [xValue, yValue];

            while (this.checkAlreadyHit(randomCoordinates)) {
                xValue = getRandomNumber(1, 10);
                yValue = getRandomNumber(1, 10);
                randomCoordinates = [xValue, yValue];
            }

            this.attack(randomCoordinates, enemyGameboard);
            return getRandomNumber(1, 10);
        },

        //Check if coordinates in passAttacks array
        checkAlreadyHit(coordinates) {
            return (this.passAttacks.findIndex(e => e.toString() === coordinates.toString()) !== -1);
        }
    };
}

export default Player;
