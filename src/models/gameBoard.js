import Tile from './tile';

export default class Gameboard {
    constructor() {
        // for some reason if I use this to make the board some weird bug happens
        // this.board = new Array(10).fill(new Array(10).fill(0));
        this.board = this.fillBoard();
        this.ships = [];
    }

    fillBoard() {
        const newBoard = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        return newBoard.forEach((row) => {
            row.fill(new Tile());
        });
    }

    placeShip(coords) {
        coords.forEach((coord) => {
            this.board[coord[0]][coord[1]].ship = 1;
        });
    }

    receiveAttack(attack) {
        if (this.board[attack[0]][attack[1]].ship === 1) {

            return true;
        }
        return false;
    }
}
