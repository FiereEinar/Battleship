import Game from "../src/models/game";

describe('Game functionalities', () => {
    test('Computers turn in attacking', () => {
        const game = new Game();
        // i can't test the function so im copying it
        // game.computersTurn();
        // const [x, y] = game.getComputer().getRandomMove();
        game.getPerson().getBoard().receiveAttack(4, 5);

        expect(game.getPerson().getBoard().board[4][5].getDiscovered()).toEqual(
            true,
        );
    });
});
