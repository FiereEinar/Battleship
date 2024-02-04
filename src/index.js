import './styles/style.css';

// import hello from './js/utils.js';
import Gameboard from './models/gameBoard.js';
import Ship from './models/ship.js';

import Computer from './models/computer.js';
import PersonPlayer from './models/person.js';

const person = new PersonPlayer('Nick');
const computer = new PersonPlayer();

const myShip = new Ship('carrier', 4);
const myBoard = new Gameboard();
const coord = [
    [4, 5],
    [3, 5],
    [2, 5],
    [1, 5],
];
myBoard.placeShip(coord, myShip);
myBoard.receiveAttack(4, 5);
console.log(myBoard.board);
