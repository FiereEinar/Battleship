export default class Tile {
    constructor() {
        this.ship = null;
        this.discovered = false;
    }

    setDiscovered() {
        this.discovered = true;
    }

    setShip(ship) {
        this.ship = ship;
    }

    getShip() {
        return this.ship;
    }

    getDiscovered() {
        return this.discovered;
    }

    hasShip() {
        return this.ship !== null;
    }
}
