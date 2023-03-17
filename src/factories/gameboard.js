let gameboardMax = 10;
let gameboardMin = 1;

let getPositions = (array) => array.map(e => (e.position).toString());

function checkArray(array1, array2) {
    let status = true;
    array2.forEach(element => {
        if (array1.indexOf(element) > -1) {
            status = false;
        }
    });
    return status;
}

//Check if placement is possible
function isPlacementPossible(ship, coordinates, isVertical, gameboard) {
    if (isVertical) {
        //Check if coordinates in gameboard range
        if (
            coordinates[1] + (ship.length - 1) > gameboardMax ||
            coordinates[1] + (ship.length - 1) < gameboardMin
        ) return false;

        //Check if possible coordinates are already filled
        let coordinatesArray = [];
        for (let i = 0; i < ship.length; i++) {
            coordinatesArray.push([coordinates[0], coordinates[1] + i].toString());
        }
        return checkArray(gameboard, coordinatesArray);
    }
    //Check if coordinates in gameboard range
    if (
        coordinates[0] + (ship.length - 1) > gameboardMax ||
        coordinates[0] + (ship.length - 1) < gameboardMin
    ) return false;

    //Check if possible coordinates are already filled
    let coordinatesArray = [];
    for (let i = 0; i < ship.length; i++) {
        coordinatesArray.push([coordinates[0] + i, (coordinates[1])].toString());
    }
    return checkArray(gameboard, coordinatesArray);
    // return checkArray(gameboard, coordinatesArray);
}
//chaneg thsi function to check if position is already taken

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
            let gameboardPositions = getPositions(this.gameboard);
            if (isPlacementPossible(ship, coordinates, isVertical, gameboardPositions) === false) return false;

            if (isVertical) {
                for (let i = 0; i < ship.length; i++) {
                    let currentCordinates = [coordinates[0], coordinates[1] + i];
                    let object = new shipObject(ship, currentCordinates);
                    this.gameboard.push(object);
                }
                return true;
            }

            for (let i = 0; i < ship.length; i++) {
                let currentCordinates = [coordinates[0] + i, (coordinates[1])];
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
                else {
                    object.times = 1;
                    accumlator.push(object.ship);
                }
                return accumlator;
            }, []);

            let shipsSunkStatus = newArray.every(e => e.isSunk() === true);
            return shipsSunkStatus;
        },

        //Indicates ship locations on board
        updateShipPlacement(gameboard = this.gameboard) {
            if (gameboard.length == 0) return;
            (gameboard).forEach((element) => {
                let coordinates = element.position;
                let tiles = document.querySelector(`[data-value="${coordinates[0]},${coordinates[1]}"]`)
                tiles.classList.add('selected');
            })
        }
    };
}

export default Gameboard;