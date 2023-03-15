import Gameboard from '../factories/gameboard';
import Player from '../factories/player';
import Ship from '../factories/shipFactory';

describe('Player Tests', () => {
    let testPlayer = Player();
    let enemyGameboard = Gameboard();
    let testShip = Ship(2, "Destroyer");
    testPlayer.attack([1, 9], enemyGameboard);
    testPlayer.attack([1, 9], enemyGameboard);

    test('Check Already Hit', () => {
        expect(testPlayer.checkAlreadyHit([1,9])).toBe(true);
    })
    
    test('Attack enemy gameboard and update passAttcks array', () => {
        expect(testPlayer.passAttacks).toEqual([[1, 9]]);
    })

    test('Attack enemy gameboard and update enemy missed arrays', () => {
        expect(enemyGameboard.missedShots).toEqual([[1, 9]]);
    })

    test('Randomly Attack', () => {
        enemyGameboard.placeShip(testShip, [1, 1], true);
        while (enemyGameboard.checkAllShipsSunk() == false) {
            testPlayer.randomAttack(enemyGameboard);
        }
        expect(enemyGameboard.checkAllShipsSunk()).toBe(true);
    })
})