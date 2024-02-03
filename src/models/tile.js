export default class Tile {
    constructor() {
        this.ship = null;
        this.discovered = false;
    }

    setShip(ship) {
        this.ship = ship;
    }
}
