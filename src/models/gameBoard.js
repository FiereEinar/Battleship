import Tile from './tile.js';
import { getRandomNum } from '../js/utils.js';

export default class Gameboard {
    constructor() {
        this.board = this.fillBoard();
        this.aliveShips = [];
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

    placeShip(coords, ship) {
        coords.forEach((coord) => {
            const [x, y] = coord;
            this.board[x][y].setShip(ship.getName());
            this.takenSpots.push([x, y]);
        });
        this.aliveShips.push(ship);
    }

    placeShipX(ship) {
        let x, y, xCopy; // copy is passed to the isOutOfbounds() because x is being decremented
        let coordinates;

        // we keep on getting new random coords if its out of bounds
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

        this.placeShip(coordinates, ship);
    }

    placeShipY(ship) {
        let x, y, yCopy;
        let coordinates;

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
