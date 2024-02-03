import Gameboard from '../src/models/gameBoard';
import Ship from '../src/models/ship';

describe('Gameboard functionalities', () => {
    test('Correct board size', () => {
        const myBoard = new Gameboard();
        expect(myBoard.board.length).toEqual(10);
        expect(myBoard.board[0].length).toEqual(10);
    });

    test('Place a ship on X axis', () => {
        const myBoard = new Gameboard();
        const myShip = new Ship('carrier', 4);
        myBoard.placeShip(
            [
                [4, 5],
                [3, 5],
                [2, 5],
                [1, 5],
            ],
            myShip,
        );
        expect(myBoard.board[4][5].getShip()).toEqual('carrier');
        expect(myBoard.board[3][5].getShip()).toEqual('carrier');
        expect(myBoard.board[2][5].getShip()).toEqual('carrier');
        expect(myBoard.board[1][5].getShip()).toEqual('carrier');
    });

    // test('Reject ship placement if already occupied', () => {
    //     const myBoard = new Gameboard();
    //     myBoard.placeShip([
    //         [2, 3],
    //         [2, 4],
    //     ]);
    //     expect(myBoard.receiveAttack([2, 3])).toEqual(true);
    // });
});
