import Player from './factories/player'
import GameInitialiser from './initialiseGame'
import tileHover from './initialiseGame'
let gameboardMax = 10;
let gameboardMin = 1;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomBoolean() {
    return (Math.random() < 0.5);
}

let AiPlayer = () => {
    let player = Player("aiPlayer");
    let initialiseGame = GameInitialiser();
    return {
        player,
        initialiseGame,

        generateShips() {
            initialiseGame.createShips(this.player);
        },

        generateGameboard(gameboard = this.player.gameboard, shipNumber = 0) {
            if (shipNumber === 5) return;
            let xValue = getRandomNumber(gameboardMin, gameboardMax);
            let yValue = getRandomNumber(gameboardMin, gameboardMax);
            let randomCoordinates = [xValue, yValue];
            let randomOrientation = getRandomBoolean();

            while (gameboard.placeShip(player.ships[shipNumber], randomCoordinates, randomOrientation)) {
                xValue = getRandomNumber(1, 10);
                yValue = getRandomNumber(1, 10);
                randomCoordinates = [xValue, yValue];
            }
            this.generateGameboard(gameboard, ++shipNumber);
        },

        enableAttacking(player = this.player, gameboard = this.player.gameboard) {
            let gameboardTiles = document.querySelectorAll('#player2-gameboard > .gameboard-tile');
            console.log(player.ships);
            gameboardTiles.forEach(tile => {
                tile.addEventListener('click', () => {
                    let coordinates = tile.getAttribute('data-value');
                    coordinates = coordinates.split(',');
                    let xValue = parseInt(coordinates[0]);
                    let yValue = parseInt(coordinates[1]);

                    player.attack([xValue, yValue], gameboard);
                    gameboard.updateMissed("#player2-gameboard");
                    gameboard.updateHit("#player2-gameboard", player);
                })
            });
        }
    };
}

export default AiPlayer;

