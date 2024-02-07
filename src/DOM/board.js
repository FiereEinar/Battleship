export default function renderBoard(board, parentElement) {
    // remove prevoius elements when shuffling or restarting
    const prev = parentElement.querySelectorAll('div');
    if (prev.length !== 0) {
        prev.forEach((div) => div.remove());
    }

    board.forEach((row, i) => {
        row.forEach((tile, j) => {
            const newTile = document.createElement('div');
            newTile.dataset.row = i;
            newTile.dataset.col = j;
            if (tile.hasShip()) {
                newTile.dataset.ship = tile.ship;
            } else {
                newTile.dataset.ship = 'none';
            }
            parentElement.appendChild(newTile);
        });
    });
}
