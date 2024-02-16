import Player from './player.js';
import { getRandomNum } from '../js/utils.js';

export default class Computer extends Player {
    constructor() {
        super();
        this.previousMoves = [];
    }

    getRandomMove() {
        while (true) {
            const coords = [getRandomNum(10), getRandomNum(10)];
            if (
                !this.previousMoves.some(
                    // checks if the coords is already taken
                    (move) => JSON.stringify(move) === JSON.stringify(coords),
                )
            ) {
                this.previousMoves.push(coords); // Add new coordinates to previousMoves
                return coords;
            }
        }
    }

    resetMoves() {
        this.previousMoves = [];
    }
}
