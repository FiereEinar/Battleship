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
                newTile.draggable = true;
                newTile.addEventListener('dragstart', (e) => {
                    console.log(e);
                });
            } else {
                newTile.dataset.ship = 'none';
                newTile.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    console.log(`${e.target.dataset.row}-${e.target.dataset.col}`);
                });
            }
            parentElement.appendChild(newTile);
        });
    });
}

/*  

PLAN:
have a draggable sprite (could be just a div)
that sprite's origin coordinates will determine where will it be placed

MAYBE:
pass the entire board class to render function and just extract the board itseft in the function?

*/
