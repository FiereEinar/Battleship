import Tile from './tile.js';
import { getRandomNum } from '../js/utils.js';

export default class Gameboard {
    constructor() {
        this.board = this.fillBoard();
        this.aliveShips = [];
        // TODO: use a Set();
        this.takenSpots = [];
    }

    fillBoard() {
        const newBoard = [];
        for (let i = 0; i < 10; i++) {
            newBoard.push([]);
        }
        newBoard.forEach((row) => {
            for (let j = 0; j < 10; j++) {
                row.push(new Tile());
            }
        });
        return newBoard;
    }

    getShips() {
        return this.aliveShips;
    }

    getBoard() {
        return this.board;
    }

    getTileAt(x, y) {
        return this.board[x][y];
    }

    getCoordinatesX(x, y, length) {
        const coords = [];

        for (let i = 0; i < length; i++) {
            coords.push([x, y]);
            x--;
        }
        return coords;
    }

    getCoordinatesY(x, y, length) {
        const coords = [];

        for (let i = 0; i < length; i++) {
            coords.push([x, y]);
            y--;
        }
        return coords;
    }

    placeShip(coords, ship) {
        coords.forEach((coord) => {
            const [x, y] = coord;
            this.board[x][y].setShip(ship.getName());
            this.takenSpots.push([x, y]);
        });
        this.aliveShips.push(ship);
    }

    placeShipX(ship, argX, argY) {
        let x;
        let y;
        let xCopy; // copy is passed to the isOutOfbounds() because x is being decremented
        let coordinates;

        if (
            (argX === undefined && argY === undefined) ||
            (argX === null && argY === null)
        ) {
            // we keep on getting new random coords if its out of bounds or there's no coordinate provided
            do {
                x = getRandomNum(10);
                y = getRandomNum(10);

                coordinates = [];
                xCopy = x;
                // then we get the coordinates and pass it to the isAlreadyTaken funcion
                // to check if it's taken
                for (let i = 0; i < ship.shipLength; i++) {
                    coordinates.push([x, y]);
                    x--;
                }
            } while (
                this.isOutOfBounds(xCopy, ship.shipLength) ||
                this.isAlreadyTaken(coordinates)
            );
        } else {
            coordinates = [];

            for (let i = 0; i < ship.shipLength; i++) {
                coordinates.push([argX, argY]);
                argX--;
            }
        }

        this.placeShip(coordinates, ship);
    }

    placeShipY(ship, argX, argY) {
        let x = argX;
        let y = argY;
        let yCopy; // copy is passed to the isOutOfbounds() because x is being decremented
        let coordinates;

        if (
            (argX === undefined && argY === undefined) ||
            (argX === null && argY === null)
        ) {
            do {
                x = getRandomNum(10);
                y = getRandomNum(10);

                coordinates = [];
                yCopy = y;

                for (let i = 0; i < ship.shipLength; i++) {
                    coordinates.push([x, y]);
                    y--;
                }
            } while (
                this.isOutOfBounds(yCopy, ship.shipLength) ||
                this.isAlreadyTaken(coordinates)
            );
        } else {
            coordinates = [];

            for (let i = 0; i < ship.shipLength; i++) {
                coordinates.push([argX, argY]);
                argY--;
            }
        }

        this.placeShip(coordinates, ship);
    }

    isAlreadyTaken(coords) {
        let isTaken = false;
        this.takenSpots.forEach((spot) => {
            const [row, col] = spot;
            coords.forEach((coord) => {
                const [x, y] = coord;
                if (row === x && col === y) isTaken = true;
            });
        });
        return isTaken;
    }

    isOutOfBounds(pos, len) {
        return pos - len < 0 || pos > 10;
    }

    receiveAttack(x, y) {
        this.board[x][y].setDiscovered();
        if (this.board[x][y].hasShip()) {
            const hitShip = this.aliveShips.find(
                (ship) => ship.getName() === this.board[x][y].getShip(),
            );
            hitShip.hit();
        }
    }

    isAllShipSunk() {
        let isAllShipSunk = true;
        this.aliveShips.forEach((ship) => {
            if (!ship.isSunk()) isAllShipSunk = false;
        });
        return isAllShipSunk;
    }

    restartBoard() {
        this.board = this.fillBoard();
        this.aliveShips = [];
        this.takenSpots = [];
    }
}
