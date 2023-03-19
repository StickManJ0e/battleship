import Player from './factories/player'
import GameInitialiser from './initialiseGame'
let gameboardMax = 10;
let gameboardMin = 1;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomBoolean() {
    return (Math.random() < 0.5);
}

function getTileCoordinate(tile) {
    let coordinates = tile.getAttribute('data-value');
    coordinates = coordinates.split(',');
    let xValue = parseInt(coordinates[0]);
    let yValue = parseInt(coordinates[1]);
    return [xValue, yValue];
}

let AiPlayer = () => {
    let aiPlayer = Player("aiPlayer");
    let initialiseGame = GameInitialiser();
    return {
        aiPlayer,
        initialiseGame,

        generateShips() {
            initialiseGame.createShips(this.aiPlayer);
        },

        generateGameboard(gameboard = this.aiPlayer.gameboard, shipNumber = 0) {
            if (shipNumber === 5) return;
            let xValue = getRandomNumber(gameboardMin, gameboardMax);
            let yValue = getRandomNumber(gameboardMin, gameboardMax);
            let randomCoordinates = [xValue, yValue];
            let randomOrientation = getRandomBoolean();

            while (gameboard.placeShip(aiPlayer.ships[shipNumber], randomCoordinates, randomOrientation) == false) {
                xValue = getRandomNumber(1, 10);
                yValue = getRandomNumber(1, 10);
                randomCoordinates = [xValue, yValue];
            }
            this.generateGameboard(gameboard, shipNumber + 1);
        },

        startAiGame(enemyPlayer, aiPlayer = this.aiPlayer, gameboard = this.aiPlayer.gameboard) {
            let gameboardTiles = document.querySelectorAll('#player2-gameboard > .gameboard-tile');
            gameboardTiles.forEach(tile => {
                tile.addEventListener('click', () => {
                    //Player Turn
                    let coordinates = getTileCoordinate(tile);
                    enemyPlayer.attack(coordinates, gameboard);
                    gameboard.updateMissed("#player2-gameboard");
                    gameboard.updateHit("#player2-gameboard", aiPlayer);
                    if (gameboard.checkAllShipsSunk() == true) {
                        initialiseGame.declareWinner('player1');
                        return;
                    };

                    //AI Turn
                    this.aiTurn(enemyPlayer);
                }, { once: true });
            });
        },

        aiTurn(enemyPlayer) {
            aiPlayer.randomAttack(enemyPlayer.gameboard);
            enemyPlayer.gameboard.updateMissed("#player1-gameboard");
            enemyPlayer.gameboard.updateHit("#player1-gameboard", enemyPlayer);
            if (enemyPlayer.gameboard.checkAllShipsSunk() == true) {
                initialiseGame.declareWinner('player2');
                return;
            };
        }
    };
}

export default AiPlayer;

