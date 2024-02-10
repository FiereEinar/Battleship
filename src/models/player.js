import Gameboard from './gameBoard.js';
import Ship from './ship.js';
import shipData from '../constants/shipData.js';

export default class Player {
    constructor() {
        this.playerBoard = new Gameboard();
    }

    getBoard() {
        return this.playerBoard;
    }

    addShips() {
        const ships = shipData;
        this.getBoard().restartBoard();
        ships.forEach((ship) => {
            const [shipName, length] = ship;
            const newShip = new Ship(shipName, length);

            const axis = Math.floor(Math.random() * 2);

            if (axis === 0) {
                this.getBoard().placeShipX(newShip);
            } else {
                this.getBoard().placeShipY(newShip);
            }
        });
    }

    redeployShips() {
        this.getBoard().restartBoard();
        this.addShips();
    }
}
