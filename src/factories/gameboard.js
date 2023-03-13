let gameboardMax = 10;
let gameboardMin = 1;

//Check if placement is possible
function isPlacementPossible(ship, coordinates, isVertical) {
    if (isVertical) {
        if (
            coordinates[0] + (ship.length - 1) > gameboardMax ||
            coordinates[0] + (ship.length - 1) < gameboardMin
        ) return false;
        return true;
    }
    if (
        coordinates[1] + (ship.length - 1) > gameboardMax ||
        coordinates[1] + (ship.length - 1) < gameboardMin
    ) return false;
    return true;

}

//Create a ship object 
function shipObject(ship, coordinates) {
    this.ship = ship;
    this.position = coordinates;
}

//Gameboard factory function
let Gameboard = () => {
    let gameboard = [];
    let missedShots = [];
    return {
        gameboard,
        missedShots,

        placeShip(ship, coordinates, isVertical) {
            if (isPlacementPossible(ship, coordinates, isVertical) === false) return false;

            if (isVertical) {
                for (let i = 0; i < ship.length; i++) {
                    let currentCordinates = [(coordinates[0] + i), coordinates[1]];
                    let object = new shipObject(ship, currentCordinates);
                    this.gameboard.push(object);
                }
                return true;
            }

            for (let i = 0; i < ship.length; i++) {
                let currentCordinates = [coordinates[0], (coordinates[1] + i)];
                let object = new shipObject(ship, currentCordinates);
                this.gameboard.push(object);
            }
            return true;
        },

        recieveAttack(coordinates) {
            let object = this.gameboard.find(e => (e.position).toString() == coordinates.toString());
            let gameboardIndex = this.gameboard.indexOf(object);

            if (gameboardIndex === -1) {
                this.recieveMissedHit(coordinates);
                return;
            }

            gameboard[gameboardIndex].ship.hit(coordinates);
            return gameboard[gameboardIndex].ship.hits;
        },

        recieveMissedHit(coordinates) {
            let missedShotsIndex = this.missedShots.findIndex(e => e.toString() === coordinates.toString());
            if (missedShotsIndex === -1) {
                this.missedShots.push(coordinates);
                return;
            }
            return;
        },

        checkAllShipsSunk() {
            let newArray = gameboard.reduce((accumlator, object) => {
                if (accumlator.find(arrItem => arrItem.name === object.ship.name)) {
                    object.times++;
                }
                else{
                    object.times = 1;
                    accumlator.push(object.ship);
                }
                return accumlator;
            }, []);

            let shipsSunkStatus = newArray.every(e => e.isSunk() === true);
            return shipsSunkStatus;
        }
    };
}

export default Gameboard;