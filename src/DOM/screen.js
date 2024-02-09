import PersonPlayer from '../models/person.js';
import Computer from '../models/computer.js';
import renderBoard from './board.js';
import Gameboard from '../models/gameBoard.js';
import shipData from '../constants/shipData.js';

const screen = (() => {
    const player = new PersonPlayer('null'); // to be set after the prompt
    const computer = new Computer();

    const start = () => {
        const prompt = document.querySelector('.prompt');
        const submit = document.querySelector('.submitPrompt');
        const input = document.querySelector('#name');
        const editContainer = document.querySelector('.editContainer');

        // the board for editing the position of ships
        // renderBoard(new Gameboard().getBoard(), editContainer);
        // addDraggableShips();

        prompt.classList.add('showPrompt');
        submit.addEventListener('click', () => {
            if (input.value.length !== 0) {
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

        setPlayerName(playerName);

        player.addShips();
        computer.addShips();

        renderBoard(player.getBoard().board, playerContainer);
        renderBoard(computer.getBoard().board, computerContainer);

        showControls();
        showShips();
        // TODO: give them the opportunity to change the position of thier ships

        shuffleBtn.addEventListener('click', shufflePlayerTiles);

        startBtn.addEventListener('click', startBattle);
    };

    const addDraggableShips = () => {
        // does not WORKKKKKKKKKKKKKKKKKKKKKKKKKK
        const componentsContainer = document.querySelector(
            '.componentContainer',
        );
        const ships = shipData;

        ships.forEach((ship) => {
            const [name, length] = ship;

            const container = document.createElement('div');
            container.dataset.ship = name;
            container.draggable = true;

            for (let i = 0; i < length; i++) {
                const shipPart = document.createElement('div');
                shipPart.classList.add('shipPart'); // Add a class for easy targeting
                container.appendChild(shipPart);

                shipPart.addEventListener('dragstart', (e) => {
                    // Set the currently dragged ship
                    currentDraggedShip = container;
                    e.dataTransfer.setData('text/plain', ''); // Necessary for some browsers to allow drag
                });
            }

            componentsContainer.appendChild(container);
        });

        // Add dragover event listener to the container holding draggable tiles
        componentsContainer.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Loop through all the div tiles on the board
            const tiles = document.querySelectorAll('.editContainer > div');
            let targetTile = null;
            let maxIntersectPosition = 0;

            tiles.forEach((tile) => {
                const tileRect = tile.getBoundingClientRect();
                // Check if the mouse position intersects with the tile
                if (
                    mouseX >= tileRect.left &&
                    mouseX <= tileRect.right &&
                    mouseY >= tileRect.top &&
                    mouseY <= tileRect.bottom
                ) {
                    // Check if this tile is further to the right than any previously found tile
                    if (tileRect.right > maxIntersectPosition) {
                        maxIntersectPosition = tileRect.right;
                        targetTile = tile;
                    }
                }
            });

            if (targetTile && currentDraggedShip) {
                // Do something with the targetTile
                console.log('The rightmost tile at the drop position is:', targetTile);
            } else {
                console.log('No tile found at the drop position.');
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
        showShips();
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

    const showShips = () => {
        const tiles = getPlayerTiles();
        // const enemyTiles = getComputerTiles();

        tiles.forEach((tile) => {
            if (tile.dataset.ship !== 'none') {
                tile.classList.add('hasShip');
            }
        });

        // enemyTiles.forEach((tile) => {
        //     if (tile.dataset.ship !== 'none') {
        //         tile.classList.add('hasShip');
        //     }
        // });
    };

    return {
        start,
    };
})();

export default screen;
