import PersonPlayer from '../models/person.js';
import Computer from '../models/computer.js';
import renderBoard from './board.js';

const screen = (() => {
    // maybe put your players here?
    const player = new PersonPlayer('null');
    const computer = new Computer();

    const start = () => {
        const prompt = document.querySelector('.prompt');
        const submit = document.querySelector('.submitPrompt');
        const input = document.querySelector('#name');
        prompt.classList.add('showPrompt');

        submit.addEventListener('click', () => {
            initializeGame(input.value);
            prompt.classList.remove('showPrompt');
        });
    };

    const initializeGame = (playerName) => {
        const playerContainer = document.querySelector('.playerBoard');
        const computerContainer = document.querySelector('.computerBoard');

        player.setPlayerName(playerName);
        setPlayerName(playerName);
        // add their ships
        player.addShips();
        computer.addShips();
        // render their board
        renderBoard(player.getBoard().board, playerContainer);
        renderBoard(computer.getBoard().board, computerContainer);

        initializePlayerAttack();
        // give them the opportunity to change the position of thier ships

        // have an event listener on the start button that well, starts the game
    };

    const initializePlayerAttack = () => {
        const enemyTiles = getComputerTiles();

        // Define a named function for the event listener
        const tileClickHandler = (event) => {
            const tile = event.currentTarget;
            attackTile(tile);
            playerAttack(tile.dataset.row, tile.dataset.col);
            computerAttack();
            disableClickEvent();
            // Remove the event listener after it's been triggered
            tile.removeEventListener('click', tileClickHandler);
        };

        enemyTiles.forEach((tile) => {
            tile.addEventListener('click', tileClickHandler);
        });
    };

    const playerAttack = (x, y) => {
        computer.getBoard().receiveAttack(x, y);
    };
    const computerAttack = () => {
        setTimeout(() => {
            const [x, y] = computer.getRandomMove();
            player.getBoard().receiveAttack(x, y);
            updateAttackedTile(x, y);
            enableClickEvent();
        }, 1000);
    };

    const updateAttackedTile = (x, y) => {
        const tiles = getPlayerTiles();
        tiles.forEach((tile) => {
            if (+tile.dataset.row === x && +tile.dataset.col === y)
                attackTile(tile);
        });
    };

    const attackTile = (tile) => {
        if (tile.dataset.ship !== 'none') {
            tile.classList.add('shipHit');
        } else {
            tile.classList.add('discovered');
        }
    };

    const getPlayerTiles = () => {
        const tiles = document.querySelectorAll('.playerBoard > div');
        return tiles;
    };
    const getComputerTiles = () => {
        const tiles = document.querySelectorAll('.computerBoard > div');
        return tiles;
    };

    const setPlayerName = (name) => {
        const domName = document.querySelector('.playerName');
        domName.innerHTML = name;
    };

    const disableClickEvent = () => {
        document.querySelector('.computerBoard').style.pointerEvents = 'none';
    };

    const enableClickEvent = () => {
        document.querySelector('.computerBoard').style.pointerEvents = 'auto';
    };

    return {
        start,
    };
})();

// maybe make it so that the game will only start after
// pressing the submit button?

export default screen;
