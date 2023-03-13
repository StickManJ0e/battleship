import { beforeEach } from 'node:test';
import Gameboard from '../factories/gameboard'
import Ship from '../factories/shipFactory'

describe('Gameboard Functions', () => {
    //Create test gameboard and ship
    let testGameboard = Gameboard();
    let testShip = Ship(4, "battleship");

    test('Check Inavlid Coordinates', () => {
        expect(testGameboard.placeShip(testShip, [9, 9], false)).toBe(false);
    })

    //Get only ship position and name and format accoridingly for test purposes
    test('Update Gameboard after placing ship', () => {
        //Place testShip on testBoard
        testGameboard.placeShip(testShip, [1, 9], true);
        expect(testGameboard.gameboard.map(item => `${item.position}, ${item.ship.name}`)).toEqual([
            "1,9, battleship",
            "2,9, battleship",
            "3,9, battleship",
            "4,9, battleship",
        ]);
    })

    test('Recieve attack that misses', () => {
        //Recive multiple attacks on gameboard, including one repeat
        testGameboard.recieveAttack([5, 9]);
        testGameboard.recieveAttack([6, 9]);
        testGameboard.recieveAttack([5, 9]);
        expect(testGameboard.missedShots).toEqual([
            [5, 9],
            [6, 9],
        ]);
    })

    test('Register multiple hits to ship', () => {
        //Recieve hits that contain a ship
        testGameboard.recieveAttack([2, 9]);
        testGameboard.recieveAttack([1, 9]);
        expect(testShip.hits).toEqual([
            [2, 9],
            [1, 9],
        ]);
    })

    test('Check that all ships have sunk', () => {
        let testShip2 = Ship(2, "Destroyer");
        testGameboard.placeShip(testShip2, [2, 5], false);
        //Sink all ships
        testGameboard.recieveAttack([3, 9]);
        testGameboard.recieveAttack([4, 9]);
        testGameboard.recieveAttack([2, 5]);
        testGameboard.recieveAttack([2, 6]);
        expect(testGameboard.checkAllShipsSunk()).toEqual(true);
    })
})

    //Reference
    // test('Access gameboard objects', () => {
    //     expect((testGameboard.gameboard)[1].position).toEqual([2, 9]);
    // })