// i don't know what a controller file should be,
// but my idea here is that this file should contain all functions that
// manipulates the DOM
const screenController = (() => {
    const setAttackedTileClass = (tile) => {
        if (tile.dataset.ship !== 'none') {
            tile.classList.add('shipHit');
        } else {
            tile.classList.add('discovered');
        }
    };

    const showShips = (container) => {
        const tiles = container.querySelectorAll('div');

        tiles.forEach((tile) => {
            if (tile.dataset.ship !== 'none') {
                tile.classList.add('hasShip');
            }
        });
    };

    const setPlayerName = (name) => {
        if (name.length === 0) return;
        const domName = document.querySelector('.playerName');
        domName.innerHTML = name;
    };

    // specifically for hasShip class
    const clearTileClasses = (board, className) => {
        board.forEach((tile) => {
            // prevents from removing the previously placed ships
            if (tile.dataset.ship === 'none') {
                tile.classList.remove(className);
            }
        });
    };

    const enableClickEvent = () => {
        document.querySelector('.computerBoard').style.pointerEvents = 'auto';
    };

    const disableClickEvent = () => {
        document.querySelector('.computerBoard').style.pointerEvents = 'none';
    };

    const showControls = () => {
        document.querySelector('.controls').classList.remove('hideControls');
    };

    const hideControls = () => {
        document.querySelector('.controls').classList.add('hideControls');
    };

    const hideEndgamePrompt = () => {
        // hiding the winner and restart button
        document.querySelector('.endgame').classList.remove('showEndgame');
    };

    const showEndgamePrompt = () => {
        document.querySelector('.endgame').classList.add('showEndgame');
    };

    const setWinnerName = (name) => {
        document.querySelector('.winner').innerHTML = `Winner: ${name}`;
    };

    const hidePrompt = () => {
        const prompt = document.querySelector('.prompt');
        prompt.classList.remove('showPrompt');
    };

    const showPrompt = () => {
        const prompt = document.querySelector('.prompt');
        prompt.classList.add('showPrompt');
    };

    return {
        showShips,
        enableClickEvent,
        disableClickEvent,
        setPlayerName,
        setAttackedTileClass,
        showControls,
        hideControls,
        hideEndgamePrompt,
        showEndgamePrompt,
        setWinnerName,
        clearTileClasses,
        hidePrompt,
        showPrompt,
    };
})();

export default screenController;
