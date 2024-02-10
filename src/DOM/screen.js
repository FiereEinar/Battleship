import PersonPlayer from '../models/person.js';
import Computer from '../models/computer.js';
import renderBoard from './board.js';
import shipData from '../constants/shipData.js';
import Ship from '../models/ship.js';
import Gameboard from '../models/gameBoard.js';

const screen = (() => {
    const player = new PersonPlayer('null'); // to be set after the prompt
    const computer = new Computer();
    const editContainer = document.querySelector('.editContainer');
    const prompt = document.querySelector('.prompt');
    let shipQueue = JSON.parse(JSON.stringify(shipData)); // deep copy

    const start = () => {
        const submit = document.querySelector('.submitPrompt');
        const input = document.querySelector('#name');

        // TODO: the board must be cleared when editing
        // TODO: don't allow the player to place a ship that is occupied and out of bounds
        // TODO: bugfix: when clicking the edit button and submitting it,
        // the computer adds another batch of ships
        allowEditing();

        submit.addEventListener('click', () => {
            if (input.value.length !== 0 && shipQueue.length !== 0) {
                initializeGame(input.value);
                prompt.classList.remove('showPrompt');
            }
        });
    };

    const initializeGame = (playerName) => {
        const playerContainer = document.querySelector('.playerBoard');
        const computerContainer = document.querySelector('.computerBoard');
        const shuffleBtn = document.querySelector('.shuffle');
        const startBtn = document.querySelector('.start');
        const editBtn = document.querySelector('.edit');

        setPlayerName(playerName);

        // player.addShips();
        computer.addShips();

        renderBoard(player.getBoard().board, playerContainer);
        renderBoard(computer.getBoard().board, computerContainer);

        showControls();
        showShips(playerContainer);
        // TODO: give them the opportunity to change the position of thier ships

        shuffleBtn.addEventListener('click', shufflePlayerTiles);

        startBtn.addEventListener('click', startBattle);

        editBtn.addEventListener('click', allowEditing);
    };

    const allowEditing = () => {
        shipQueue = JSON.parse(JSON.stringify(shipData));
        player.getBoard().restartBoard();
        prompt.classList.add('showPrompt');

        renderBoard(player.getBoard().board, editContainer);
        startShipPlacement(shipQueue);
    };

    const startShipPlacement = (ship) => {
        const tiles = document.querySelectorAll('.editContainer > div');
        const shipLength = ship[0][1];
        const shipName = ship[0][0];
        let direction = 'X';

        window.addEventListener('keydown', (e) => {
            if (e.key === ' ' && direction === 'X') {
                direction = 'Y';
            } else {
                direction = 'X';
            }
        });

        tiles.forEach((tile) => {
            tile.addEventListener('mouseover', () => {
                showPlacementPreview(
                    +tile.dataset.row,
                    +tile.dataset.col,
                    shipLength,
                    direction,
                );
            });

            tile.addEventListener('click', () => {
                const newShip = new Ship(shipName, shipLength);

                if (direction === 'X') {
                    player
                        .getBoard()
                        .placeShipX(
                            newShip,
                            +tile.dataset.row,
                            +tile.dataset.col,
                        );
                } else {
                    player
                        .getBoard()
                        .placeShipY(
                            newShip,
                            +tile.dataset.row,
                            +tile.dataset.col,
                        );
                }
                // rerender the board after placing a ship
                renderBoard(player.getBoard().board, editContainer);
                showShips(editContainer);
                // removing the first element since it was already placed
                if (shipQueue.length > 1) {
                    shipQueue.shift();
                    // restarting the eventlisteners for placements
                    startShipPlacement(shipQueue);
                }
            });
        });
    };

    const showPlacementPreview = (x, y, length, axis) => {
        const tiles = document.querySelectorAll('.editContainer > div');
        const coordinates = [];
        const xCopy = x;
        const yCopy = y;

        for (let i = 0; i < length; i++) {
            coordinates.push([x, y]);
            if (axis === 'X') {
                x--;
            } else {
                y--;
            }
        }

        clearTileClasses(tiles);
        if (axis === 'X' && player.getBoard().isOutOfBounds(xCopy, length - 1))
            return;
        if (axis === 'Y' && player.getBoard().isOutOfBounds(yCopy, length - 1))
            return;

        coordinates.forEach((coord) => {
            const [row, col] = coord;

            tiles.forEach((tile) => {
                if (row === +tile.dataset.row && col === +tile.dataset.col) {
                    tile.classList.add('hasShip');
                }
            });
        });
    };

    // specifically for hasShip class
    const clearTileClasses = (board) => {
        board.forEach((tile) => {
            // prevents from removing the previously placed ships
            if (tile.dataset.ship === 'none') {
                tile.classList.remove('hasShip');
            }
        });
    };

    const startBattle = () => {
        initializePlayerAttack();
        hideControls();
    };

    const initializePlayerAttack = () => {
        const enemyTiles = getComputerTiles();

        // Define a named function for the event listener
        const tileClickHandler = (event) => {
            const tile = event.currentTarget;
            attackTile(tile);
            computer
                .getBoard()
                .receiveAttack(tile.dataset.row, tile.dataset.col);
            disableClickEvent();
            // Remove the event listener after it's been triggered
            tile.removeEventListener('click', tileClickHandler);
            // we do this checking so that we only enableClickEvents
            // and allow the computer to attack if there's no winner
            if (!checkWinner(computer, player.getPlayerName())) {
                computerAttack();
            }
        };

        enemyTiles.forEach((tile) => {
            tile.addEventListener('click', tileClickHandler);
        });
    };

    const computerAttack = () => {
        setTimeout(() => {
            const [x, y] = computer.getRandomMove();
            player.getBoard().receiveAttack(x, y);
            updateAttackedTile(x, y);
            if (!checkWinner(player, 'Computer')) {
                enableClickEvent();
            }
        }, 0);
    };

    const checkWinner = (attackedPlayer, attackerName) => {
        if (attackedPlayer.getBoard().isAllShipSunk()) {
            document.querySelector('.winner').innerHTML =
                `Winner: ${attackerName}`;
            showWinner();
            return true;
        }
        return false;
    };

    const showWinner = () => {
        disableClickEvent();

        document.querySelector('.endgame').classList.add('showEndgame');

        const restartBtn = document.querySelector('.endgame > .restart');
        restartBtn.addEventListener('click', () => {
            restartGame();
        });
    };

    const hideWinner = () => {
        // hiding the winner and restart button
        document.querySelector('.endgame').classList.remove('showEndgame');
    };

    const restartGame = () => {
        player.getBoard().restartBoard();
        computer.getBoard().restartBoard();
        initializeGame(player.getPlayerName());
        hideWinner();
        enableClickEvent();
    };

    const shufflePlayerTiles = () => {
        const playerContainer = document.querySelector('.playerBoard');

        player.redeployShips();
        renderBoard(player.getBoard().board, playerContainer);
        showShips(playerContainer);
    };

    const showControls = () => {
        document.querySelector('.controls').classList.remove('hideControls');
    };

    const hideControls = () => {
        document.querySelector('.controls').classList.add('hideControls');
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
        if (name.length === 0) return;
        player.setPlayerName(name);
        const domName = document.querySelector('.playerName');
        domName.innerHTML = name;
    };

    const disableClickEvent = () => {
        document.querySelector('.computerBoard').style.pointerEvents = 'none';
    };

    const enableClickEvent = () => {
        document.querySelector('.computerBoard').style.pointerEvents = 'auto';
    };

    const showShips = (container) => {
        const tiles = container.querySelectorAll('div');

        tiles.forEach((tile) => {
            if (tile.dataset.ship !== 'none') {
                tile.classList.add('hasShip');
            }
        });
    };

    return {
        start,
    };
})();

export default screen;
