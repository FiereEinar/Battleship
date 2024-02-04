import PersonPlayer from '../src/models/person';
import Computer from '../src/models/computer';

describe('Player functionalities', () => {
    test('Properly adds all the ships', () => {
        const player = new PersonPlayer();
        player.addShips();
        expect(player.getBoard().getShips().length).toEqual(5);
    });

    test('Computer hit attack', () => {
        const player = new PersonPlayer();
        const computer = new Computer();
        const [x, y] = computer.getRandomMove();

        player.getBoard().receiveAttack(x, y);

        expect(player.getBoard().board[x][y].getDiscovered()).toEqual(true);
    });

    test('Player hit attack', () => {
        const computer = new Computer();

        computer.getBoard().receiveAttack(3, 2);

        expect(computer.getBoard().board[3][2].getDiscovered()).toEqual(true);
    });
});
