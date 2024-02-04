import PersonPlayer from './person';
import Computer from './computer';

export default class Game {
    constructor() {
        this.person = new PersonPlayer();
        this.computer = new Computer();
        this.playerTurn = true;
    }

    getPerson() {
        return this.person;
    }

    getComputer() {
        return this.computer;
    }

    setPlayerName(name) {
        this.getPerson().setPlayerName(name);
    }

    flipTurn() {
        this.playerTurn = !this.playerTurn;
    }

    playersTurn() {
        this.getPerson();
    }

    computersTurn() {
        const [x, y] = this.getComputer().getRandomMove();
        this.getPerson().getBoard().receiveAttack(x, y);
    }
}
