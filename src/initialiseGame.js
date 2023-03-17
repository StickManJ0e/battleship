import Player from './factories/player';
import Ship from './factories/shipFactory';
let gameboardMax = 10;
let gameboardMin = 1;

function appendGameBoardDivs(idName, appendLocation) {
    //Create Gameboard Div
    let gameBoardDiv = document.createElement('div');
    gameBoardDiv.setAttribute('id', idName.toString());
    gameBoardDiv.classList.add('gameboard-div');
    appendLocation.appendChild(gameBoardDiv);

    //Create indivisual gameboard tiles with data-values corresponding to coordinates
    for (let y = 1; y <= gameboardMax; y++) {
        for (let x = 1; x <= gameboardMax; x++) {
            let gameboardTile = document.createElement('div');
            gameboardTile.classList.add('gameboard-tile');
            gameboardTile.setAttribute('data-value', [x, y]);
            gameBoardDiv.appendChild(gameboardTile);
        };
    };
    return gameBoardDiv;
};

function createElementWithClassText(className, element, appendLocation, text) {
    let div = document.createElement(element);
    div.classList.add(className);
    div.textContent = text;
    appendLocation.appendChild(div);
    return div;
};

function tileHover(isVertical, xValue, yValue, currentShip, addOrRemoveClass) {
    if (isVertical == false) {
        let length = ((xValue + (currentShip.length - 1)) > gameboardMax) ? 11 - xValue : currentShip.length;
        for (let i = 0; i < length; i++) {
            //Add hover class for adjacent tiles based on ship length
            let adjacentTile = document.querySelector(`[data-value="${xValue + i},${yValue}"]`);
            if (addOrRemoveClass === 'add') {
                adjacentTile.classList.add('hover');
            }

            else if (addOrRemoveClass === 'remove') {
                adjacentTile.classList.remove('hover');
            };
        };
        return;
    };

    let length = ((yValue + (currentShip.length - 1)) > gameboardMax) ? 11 - yValue : currentShip.length;
    for (let i = 0; i < length; i++) {
        //Add hover class for adjacent tiles based on ship length
        let adjacentTile = document.querySelector(`[data-value="${xValue},${yValue + i}"]`);
        if (addOrRemoveClass === 'add') {
            adjacentTile.classList.add('hover');
        }

        else if (addOrRemoveClass === 'remove') {
            adjacentTile.classList.remove('hover');
        };
    };
    return;
};

let GameInitialiser = () => {
    let gameStart = false;
    return {
        gameStart,
        createStartGameMenu(appendLocation) {
            let startMenuDiv = createElementWithClassText('start-menu-div', 'div', appendLocation);
            let welcomeText = createElementWithClassText('welcome-text', 'div', startMenuDiv, 'Welcome to Battleships');
            let placeTextDiv = createElementWithClassText('place-text', 'div', startMenuDiv);
            let placeTextP = createElementWithClassText('place-text-p', 'p', placeTextDiv, 'Place your');
            let placeTextShip = createElementWithClassText('place-current', 'p', placeTextDiv);
            let rotateButton = createElementWithClassText('rotate-button', 'button', startMenuDiv, 'Rotate');
            let gameboard = appendGameBoardDivs('place-ship-gameboard', startMenuDiv);
        },

        createShips(player) {
            player.ships.push(Ship(5, 'Carrier'));
            player.ships.push(Ship(4, 'Battleship'));
            player.ships.push(Ship(3, 'Cruiser'));
            player.ships.push(Ship(3, 'Carrier'));
            player.ships.push(Ship(2, 'Destroyer'));
        },

        enableShipPlacing(player, shipQueue = [], queueNumber = 0, isVertical = false) {
            let currentShipText = document.querySelector('.place-current');
            let gameboardTiles = document.querySelectorAll('.gameboard-tile');
            let placeShipGameboard = document.querySelector('#place-ship-gameboard')
            let startMenuDiv = document.querySelector('.start-menu-div')
            let rotateButton = document.querySelector('.rotate-button');
            player.gameboard.updateShipPlacement();

            //Change orientation of ship on click
            rotateButton.addEventListener('click', () => {
                isVertical = (isVertical == false) ? true : false;
            })

            //Go through queue
            shipQueue.push(player.ships[0]);
            while (shipQueue.length > 0 && queueNumber < 5) {
                shipQueue.shift();
                let currentShip = player.ships[queueNumber];

                //Queue from player ships to place each ship and change DOM elements
                currentShipText.textContent = currentShip.name;
                gameboardTiles.forEach((tile) => {

                    //Get the coordinates for current tile
                    let coordinates = tile.getAttribute('data-value');
                    coordinates = coordinates.split(',');
                    let xValue = parseInt(coordinates[0]);
                    let yValue = parseInt(coordinates[1]);

                    //Add class to adjacent coordinates on hover
                    tile.addEventListener('mouseover', () => {
                        tileHover(isVertical, xValue, yValue, currentShip, 'add');
                    })

                    //Remove class to adjacent coordinates on hover
                    tile.addEventListener('mouseout', () => {
                        tileHover(isVertical, xValue, yValue, currentShip, 'remove');
                    })

                    tile.addEventListener('click', () => {
                        coordinates = [xValue, yValue];
                        if (player.gameboard.placeShip(currentShip, coordinates, isVertical) == true) {
                            //Add next ship to queue and recall the function
                            queueNumber += 1;
                            shipQueue.push(player.ships[queueNumber]);

                            //Recreate gameboard to remove past event listeners
                            placeShipGameboard.remove();
                            appendGameBoardDivs('place-ship-gameboard', startMenuDiv);
                            this.enableShipPlacing(player, shipQueue, queueNumber, isVertical);
                        };
                    });
                });
            };
            if (queueNumber === 5) this.gameStart = true;
        },

        startGame() {
            let startMenuDiv = document.querySelector('.start-menu-div');
            startMenuDiv.remove();
        }
    }
}

export default GameInitialiser;