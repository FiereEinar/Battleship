import Gameboard from '../src/models/gameBoard.js';
import Ship from '../src/models/ship.js';

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

    test('Place a ship on y axis', () => {
        const myBoard = new Gameboard();
        const myShip = new Ship('carrier', 4);
        myBoard.placeShip(
            [
                [4, 5],
                [4, 4],
                [4, 3],
                [4, 2],
            ],
            myShip,
        );
        expect(myBoard.board[4][5].getShip()).toEqual('carrier');
        expect(myBoard.board[4][4].getShip()).toEqual('carrier');
        expect(myBoard.board[4][3].getShip()).toEqual('carrier');
        expect(myBoard.board[4][2].getShip()).toEqual('carrier');
    });

    test('Receive an attack and calls hit() to the targetted ship', () => {
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
        myBoard.receiveAttack(4, 5);
        expect(myShip.getHits()).toEqual(1);
    });

    test('Records miss attacks', () => {
        const myBoard = new Gameboard();
        myBoard.receiveAttack(6, 7);
        expect(myBoard.board[6][7].getDiscovered()).toEqual(true);
    });

    test('Report if all ships are sunk', () => {
        const myBoard = new Gameboard();
        const myShip = new Ship('destroyer', 2);
        myBoard.placeShip(
            [
                [3, 4],
                [2, 4],
            ],
            myShip,
        );

        myBoard.receiveAttack(3, 4);
        myBoard.receiveAttack(2, 4);
        expect(myBoard.isAllShipSunk()).toEqual(true);
    });

    test('Report if all ships are NOT sunk', () => {
        const myBoard = new Gameboard();
        const myShip = new Ship('destroyer', 2);
        myBoard.placeShip(
            [
                [3, 4],
                [2, 4],
            ],
            myShip,
        );

        myBoard.receiveAttack(2, 4);
        expect(myBoard.isAllShipSunk()).toEqual(false);
    });
});
