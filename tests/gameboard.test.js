import Gameboard from '../src/models/gameBoard';

describe('Gameboard functionalities', () => {
    test('Correct board size', () => {
        const myBoard = new Gameboard();
        expect(myBoard.board).toEqual([
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
        ]);
    });

    test('Place a ship', () => {
        const myBoard = new Gameboard();
        myBoard.placeShip([
            [2, 3],
            [2, 4],
        ]);
        expect(myBoard.board[2][3].ship).toEqual(1);
    });

    test('Reject ship placement if already occupied', () => {
        const myBoard = new Gameboard();
        myBoard.placeShip([
            [2, 3],
            [2, 4],
        ]);
        expect(myBoard.receiveAttack([2, 3])).toEqual(true);
    });
});
