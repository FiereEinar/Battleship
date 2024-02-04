import Player from './player.js';
import { getRandomNum } from '../js/utils.js';

export default class Computer extends Player {
    constructor() {
        super();
    }

    getRandomMove() {
        const x = getRandomNum(10);
        const y = getRandomNum(10);
        return [x, y];
    }
}
