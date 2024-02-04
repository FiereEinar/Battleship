import Player from './player.js';

export default class PersonPlayer extends Player {
    constructor() {
        super();
        this.playerName = '';
    }

    setPlayerName(name) {
        this.playerName = name;
    }

    getPlayerName() {
        return this.playerName;
    }
}
