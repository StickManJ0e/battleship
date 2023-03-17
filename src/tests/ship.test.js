import Ship from '../factories/shipFactory'

describe('Ship Functions', () => {
    let testShip = Ship(6, "carrier");
    
    test('Corrects ship length', () => {
        expect(testShip.length).toBe(5);
    })

    test('Accept multiple hits and update hits array', () => {
        testShip.hit([1, 2]);
        testShip.hit([3, 5]);
        testShip.hit([5, 2]);
        expect(testShip.hits).toEqual([[1, 2], [3, 5], [5, 2]]);
    })


    test('Ship has not sunk', () => {
        expect(testShip.isSunk()).toBe(false);
    })

    test('Ship has sunk', () => {
        testShip.hit([4, 2]);
        testShip.hit([5, 3]);
        expect(testShip.isSunk()).toBe(true);
    })
})