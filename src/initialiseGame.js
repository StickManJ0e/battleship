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
}


let GameInitialiser = () => {
    return {
        createStartGameMenu(appendLocation) {
            let startMenuDiv = createElementWithClassText('start-menu-div', 'div', appendLocation);
            let welcomeText = createElementWithClassText('welcome-text', 'div', startMenuDiv, 'Welcome to Battleships');
            let placeTextDiv = createElementWithClassText('place-text', 'div', startMenuDiv);
            let placeTextP = createElementWithClassText('place-text-p', 'p', placeTextDiv, 'Place your');
            let placeTextShip = createElementWithClassText('place-current', 'p', placeTextDiv);
            let rotateButton = createElementWithClassText('roatet-button', 'button', startMenuDiv, 'Rotate');
            let gameboard = appendGameBoardDivs('place-ship-gameboard', startMenuDiv);
        },

        createShips(player) {
            player.ships.push(Ship(5, 'Carrier'));
            player.ships.push(Ship(4, 'Battleship'));
            player.ships.push(Ship(3, 'Cruiser'));
            player.ships.push(Ship(3, 'Carrier'));
            player.ships.push(Ship(2, 'Destroyer'));
            return;
        },

        enableShipPlacing() {
            let currentShipText = document.querySelector('place-current');
        }
    }
}

export default GameInitialiser;