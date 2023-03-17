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
