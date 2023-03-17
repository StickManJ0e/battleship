console.log('working');
import GameInitialiser from './initialiseGame';
import Player from './factories/player';
import Ship from './factories/shipFactory';
import Gameboard from './factories/shipFactory'

let body = document.querySelector('body');
let initialiseGame = GameInitialiser();
initialiseGame.createStartGameMenu(body);

let player = Player("player1");
initialiseGame.createShips(player);
initialiseGame.enableShipPlacing(player);

function waitFor(conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}

//Wait until ships have been placed
async function waitStart() {
    await waitFor(_ => initialiseGame.gameStart == true);

    //Start Game Loop
    initialiseGame.startGame();
}

waitStart()
