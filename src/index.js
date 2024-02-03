import './styles/style.css';

// import hello from './js/utils.js';
import Gameboard from './models/gameBoard.js';
import Ship from './models/ship.js';

const myShip = new Ship(2, [
    [2, 3],
    [2, 4],
]);
const myBoard = new Gameboard();
myBoard.placeShip(myShip.getPosition());

console.log(myShip.getPosition());
console.log(myBoard.board);
