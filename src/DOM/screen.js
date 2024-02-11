import PersonPlayer from '../models/person.js';
import Computer from '../models/computer.js';
import renderBoard from './board.js';
import shipData from '../constants/shipData.js';
import Ship from '../models/ship.js';
import screenController from './controller.js';

const screen = (() => {
    const player = new PersonPlayer('null'); // to be set after the prompt
    const computer = new Computer();
    const editContainer = document.querySelector('.editContainer');
    let shipQueue = JSON.parse(JSON.stringify(shipData)); // deep copy

    const start = () => {
        const submit = document.querySelector('.submitPrompt');
        enableEditing();
        submit.addEventListener('click', submitHandler);
    };

    const submitHandler = () => {
        const input = document.querySelector('#name');
        if (input.value.length !== 0 && shipQueue.length === 1) {
            initializeGame(input.value);
            screenController.hidePrompt();
        } else {
            screenController.showSubmitWarning();
        }
    };

    const initializeGame = (playerName) => {
        const playerContainer = document.querySelector('.playerBoard');
        const computerContainer = document.querySelector('.computerBoard');
        const shuffleBtn = document.querySelector('.shuffle');
        const startBtn = document.querySelector('.start');
        const editBtn = document.querySelector('.edit');

        screenController.setPlayerName(playerName);
        player.setPlayerName(playerName);
        computer.addShips();

        renderBoard(player.getBoard().board, playerContainer);
        renderBoard(computer.getBoard().board, computerContainer);

        screenController.showControls();
        screenController.showShips(playerContainer);

        shuffleBtn.addEventListener('click', shufflePlayerTiles);
        startBtn.addEventListener('click', startBattle);
        editBtn.addEventListener('click', enableEditing);
    };

    const enableEditing = () => {
        shipQueue = JSON.parse(JSON.stringify(shipData));
        player.getBoard().restartBoard();
        screenController.showPrompt();

        renderBoard(player.getBoard().board, editContainer);
        startShipPlacement(shipQueue);
    };

    // long ass function
    const startShipPlacement = (ship) => {
        const tiles = document.querySelectorAll('.editContainer > div');
        const axisBtn = document.querySelector('.changeAxis');
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

        axisBtn.addEventListener('click', () => {
            if (direction === 'X') {
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
                shipPlacementHandler(direction, shipName, shipLength, tile);
            });
        });
    };

    const shipPlacementHandler = (direction, shipName, shipLength, tile) => {
        const x = +tile.dataset.row;
        const y = +tile.dataset.col;
        const newShip = new Ship(shipName, shipLength);
        let shipPlaced = false;

        if (direction === 'X') {
            // get the coordinates based on the axis
            const coords = player.getBoard().getCoordinatesX(x, y, shipLength);

            // then check its validity, if true then we proceed to place that ship there
            if (isPlaceable(x, y, direction, shipLength, coords)) {
                player.getBoard().placeShipX(newShip, x, y);
                shipPlaced = true;
            }
        } else if (direction === 'Y') {
            const coords = player.getBoard().getCoordinatesY(x, y, shipLength);

            if (isPlaceable(x, y, direction, shipLength, coords)) {
                player.getBoard().placeShipY(newShip, x, y);
                shipPlaced = true;
            }
        }
        // we do this so that we only excecute this code if the ship was placed
        if (shipPlaced) {
            // rerender the board after placing a ship
            renderBoard(player.getBoard().board, editContainer);
            screenController.showShips(editContainer);
            // removing the first element since it was already placed
            if (shipQueue.length > 1) {
                shipQueue.shift();
                // restarting the eventlisteners for placements
                startShipPlacement(shipQueue);
            }
        }
    };

    const showPlacementPreview = (x, y, length, axis) => {
        const tiles = document.querySelectorAll('.editContainer > div');
        const coordinates = [];
        const xCopy = x;
        const yCopy = y;

        // get the coordinates
        for (let i = 0; i < length; i++) {
            coordinates.push([x, y]);
            if (axis === 'X') {
                x--;
            } else {
                y--;
            }
        }

        screenController.clearTileClasses(tiles, 'hasShip');
        screenController.clearTileClasses(tiles, 'warning');

        let placeable = isPlaceable(xCopy, yCopy, axis, length, coordinates);

        coordinates.forEach((coord) => {
            const [row, col] = coord;

            tiles.forEach((tile) => {
                const hasSameCoordinate = row === +tile.dataset.row && col === +tile.dataset.col;
                const hasShip = tile.classList.contains('hasShip');

                if (hasSameCoordinate && placeable) {
                    tile.classList.add('hasShip');
                } else if (hasSameCoordinate && !placeable && !hasShip) {
                    tile.classList.add('warning');
                }
            });
        });
    };

    const isPlaceable = (x, y, axis, length, coordinates) => {
        const outOfBoundsX = axis === 'X' && player.getBoard().isOutOfBounds(x, length - 1);
        const outOfBoundsY = axis === 'Y' && player.getBoard().isOutOfBounds(y, length - 1);
        const alreadyTaken = player.getBoard().isAlreadyTaken(coordinates);

        if (outOfBoundsX || outOfBoundsY || alreadyTaken) return false;
        return true;
    }

    const startBattle = () => {
        initializePlayerAttack();
        screenController.hideControls();
    };

    const initializePlayerAttack = () => {
        const enemyTiles = getComputerTiles();

        // Define a named function for the event listener
        const tileClickHandler = (event) => {
            const tile = event.currentTarget;
            screenController.setAttackedTileClass(tile);
            computer
                .getBoard()
                .receiveAttack(tile.dataset.row, tile.dataset.col);
            screenController.disableClickEvent();
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
                screenController.enableClickEvent();
            }
        }, 0);
    };

    const checkWinner = (attackedPlayer, attackerName) => {
        if (attackedPlayer.getBoard().isAllShipSunk()) {
            showWinner(attackerName);
            return true;
        }
        return false;
    };

    const showWinner = (name) => {
        screenController.disableClickEvent();
        screenController.showEndgamePrompt();
        screenController.setWinnerName(name);

        const restartBtn = document.querySelector('.endgame > .restart');
        restartBtn.addEventListener('click', restartGame);
    };

    const restartGame = () => {
        player.getBoard().restartBoard();
        computer.getBoard().restartBoard();
        computer.resetMoves();
        player.addShips();
        initializeGame(player.getPlayerName());
        screenController.hideEndgamePrompt();
        screenController.enableClickEvent();
    };

    const shufflePlayerTiles = () => {
        const playerContainer = document.querySelector('.playerBoard');

        player.redeployShips();
        renderBoard(player.getBoard().board, playerContainer);
        screenController.showShips(playerContainer);
    };

    const updateAttackedTile = (x, y) => {
        const tiles = getPlayerTiles();
        tiles.forEach((tile) => {
            if (+tile.dataset.row === x && +tile.dataset.col === y)
                screenController.setAttackedTileClass(tile);
        });
    };

    const getPlayerTiles = () => {
        const tiles = document.querySelectorAll('.playerBoard > div');
        return tiles;
    };
    const getComputerTiles = () => {
        const tiles = document.querySelectorAll('.computerBoard > div');
        return tiles;
    };

    return {
        start,
    };
})();

export default screen;
