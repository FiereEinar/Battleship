import Gameboard from './gameBoard.js';
import Ship from './ship.js';

export default class Player {
    constructor() {
        this.playerBoard = new Gameboard();
    }

    getBoard() {
        return this.playerBoard;
    }

    addShips() {
        const shipData = [
            ['carrier', 5],
            ['battleship', 4],
            ['cruiser', 3],
            ['submarine', 3],
            ['destroyer', 2],
        ];

        shipData.forEach((ship) => {
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
