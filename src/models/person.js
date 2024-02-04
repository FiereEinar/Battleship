import Player from './player.js';

export default class PersonPlayer extends Player {
    constructor(playerName) {
        super();
        this.playerName = playerName;
    }
}
