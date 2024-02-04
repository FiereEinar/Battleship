import Tile from './tile.js';
import { getRandomNum } from '../js/utils.js';

export default class Gameboard {
    constructor() {
        this.board = this.fillBoard();
        this.aliveShips = [];
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

    // TODO: add a checker if the given coordinate is already occupied

    placeShip(coords, ship) {
        coords.forEach((coord) => {
            const [x, y] = coord;
            this.board[x][y].setShip(ship.getName());
        });
        this.aliveShips.push(ship);
    }

    placeShipX(ship) {
        let x, y;
        const coordinates = [];

        // we keep on getting new random coords if its out of bounds
        do {
            x = getRandomNum(10);
            y = getRandomNum(10);
        } while (this.isOutOfBounds(x, ship.shipLength));

        // then we get the coordinates and pass it to the placeShip funcion
        for (let i = 0; i < ship.shipLength; i++) {
            coordinates.push([x, y]);
            x--;
        }
        this.placeShip(coordinates, ship);
    }

    placeShipY(ship) {
        let x, y;
        const coordinates = [];

        // we keep on getting new random coords if its out of bounds
        do {
            x = getRandomNum(10);
            y = getRandomNum(10);
        } while (this.isOutOfBounds(y, ship.shipLength));

        // then we get the coordinates and pass it to the placeShip funcion
        for (let i = 0; i < ship.shipLength; i++) {
            coordinates.push([x, y]);
            y--;
        }
        this.placeShip(coordinates, ship);
    }

    isOutOfBounds(pos, len) {
        return pos - len < 0 || pos - len > 10;
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
}
