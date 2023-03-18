console.log('working');
import GameInitialiser from './initialiseGame';
import Player from './factories/player';
import Ship from './factories/shipFactory';
import Gameboard from './factories/shipFactory'
import AiPlayer from './aiPlayer';
//Wait for coniditon to be resolved
function waitFor(conditionFunction) {

    const poll = resolve => {
        if (conditionFunction()) resolve();
        else setTimeout(_ => poll(resolve), 400);
    }

    return new Promise(poll);
}

let body = document.querySelector('body');
let initialiseGame = GameInitialiser();
initialiseGame.createStartGameMenu(body);
let player1DomGameboard = initialiseGame.createPlayerGameboard(body, 'player1-gameboard');
let player2DomGameboard = initialiseGame.createPlayerGameboard(body, 'player2-gameboard');


let player = Player("player1");
let aiPlayer = AiPlayer();
initialiseGame.createShips(player);
aiPlayer.generateShips();
aiPlayer.generateGameboard();
initialiseGame.enableShipPlacing(player);

//Wait until ships have been placed
async function waitStart() {
    await waitFor(_ => initialiseGame.gameStart == true);

    //Start Game Loop
    initialiseGame.startGame(body);
    player.gameboard.updateShipPlacement('#player1-gameboard');
    aiPlayer.enableAttacking();
}

waitStart()
