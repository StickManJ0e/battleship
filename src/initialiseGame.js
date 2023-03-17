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

let GameInitialiser = () => {
    return {
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

        tileHover(isVertical, coordinates, currentShip, addOrRemoveClass) {
            if (isVertical == false) {
                for (let i = 0; i < currentShip.length; i++) {
                    let data = `${parseInt(coordinates[0]) + i},${parseInt(coordinates[1])}`;
                    let adjacentTile = document.querySelector(`[data-value="${data}"]`);
                    if (addOrRemoveClass === 'add') {
                        adjacentTile.classList.add('hover');
                    }
                    else if (addOrRemoveClass === 'remove') {
                        adjacentTile.classList.remove('hover');
                    }
                }
            }
        },

        enableShipPlacing(player) {
            let currentShipText = document.querySelector('.place-current');
            let gameboardTiles = document.querySelectorAll('.gameboard-tile');
            let rotateButton = document.querySelector('.rotate-button');
            let isVertical = false;

            //Change orientation of ship on click
            rotateButton.addEventListener('click', () => {
                isVertical = (isVertical == false) ? true : false;
            })

            let shipQueue = player.ships;
            while (shipQueue.length) {
                //Queue from player ships to place each ship and change DOM elements
                let currentShip = shipQueue.shift();
                currentShipText.textContent = currentShip.name;

                gameboardTiles.forEach((tile) => {
                    //Get coordinate of each gameboard tile from hovering
                    tile.addEventListener('mouseover', () => {
                        let coordinate = tile.getAttribute('data-value');
                        let currentCordinates = coordinate.split(',');

                        this.tileHover(isVertical, currentCordinates, currentShip, 'add');
                    })
                    tile.addEventListener('mouseout', () => {
                        let coordinate = tile.getAttribute('data-value');
                        let currentCordinates = coordinate.split(',');

                        this.tileHover(isVertical, currentCordinates, currentShip, 'remove');
                    })
                })
            }
        }
    }
}

export default GameInitialiser;