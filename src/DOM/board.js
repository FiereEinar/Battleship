export default function renderBoard(board, parentElement) {
    board.forEach((row, i) => {
        row.forEach((tile, j) => {
            const newTile = document.createElement('div');
            // newTile.innerHTML = tile.ship;
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
