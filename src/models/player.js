import Gameboard from './gameBoard.js';

export default class Player {
    constructor() {
        this.playerBoard = new Gameboard();
    }

    getBoard() {
        return this.playerBoard;
    }
}
