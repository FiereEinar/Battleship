import Tile from './tile.js';
import { getRandomNum } from '../js/utils.js';

export default class Gameboard {
    constructor() {
        this.board = this.fillBoard();
        this.aliveShips = [];
        // TODO: use a Set();
        this.takenSpots = new Set();
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
    
    getSpots() {
        return this.takenSpots;
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
            this.addSorroundingTiles(x, y);
        });
        this.aliveShips.push(ship);
    }
    
    addSorroundingTiles(x, y) {
        const tiles = this.getSorroundingTiles(x, y);
        
        tiles.forEach((tile) => {
            const [row, col] = tile;
            this.getSpots().add(`${row}-${col}`);
        });
    }
    
    getSorroundingTiles(x, y) {
        const tiles = [[x, y]];
        const coordinates = [
            [1, 0],
            [0, 1],
            [1, 1],
            [-1, 0],
            [0, -1],
            [-1, 1],
            [1, -1],
            [-1, -1],
        ];
        
        coordinates.forEach((coords) => {
            const [row, col] = coords;
            
            if (!this.getSpots().has(`${x + row}-${y + col}`)) {
                tiles.push([x + row, y + col]);
            }
        });
        return tiles;
    }

    placeShipX(ship, argX, argY) {
        let x, y, coordinates;

        if (
            (argX === undefined && argY === undefined) ||
            (argX === null && argY === null)
        ) {
            // we keep on getting new random coords if its out of bounds or there's no coordinate provided
            do {
                x = getRandomNum(10);
                y = getRandomNum(10);

                coordinates = this.getCoordinatesX(x, y, ship.shipLength);
                // then we get the coordinates and pass it to the isAlreadyTaken funcion
                // to check if it's taken
            } while (
                this.isOutOfBounds(x, ship.shipLength) ||
                this.isAlreadyTaken(coordinates)
            );
        } else {
            coordinates = this.getCoordinatesX(argX, argY, ship.shipLength);
        }

        this.placeShip(coordinates, ship);
    }

    placeShipY(ship, argX, argY) {
        let x, y, coordinates;

        if (
            (argX === undefined && argY === undefined) ||
            (argX === null && argY === null)
        ) {
            do {
                x = getRandomNum(10);
                y = getRandomNum(10);

                coordinates = this.getCoordinatesY(x, y, ship.shipLength);
            } while (
                this.isOutOfBounds(y, ship.shipLength) ||
                this.isAlreadyTaken(coordinates)
            );
        } else {
            coordinates = this.getCoordinatesY(argX, argY, ship.shipLength);
        }

        this.placeShip(coordinates, ship);
    }

    isAlreadyTaken(coords) {
        let isTaken = false;
        
        coords.forEach((coord) => {
            const [x, y] = coord;
            if (this.getSpots().has(`${x}-${y}`)) isTaken = true;
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
        this.takenSpots = new Set();
    }
}
