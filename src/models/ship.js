export default class Ship {
    constructor(shipName, shipLength) {
        this.shipName = shipName;
        this.shipLength = shipLength;
        this.numberOfHits = 0;
        this.sunk = false;
    }

    getName() {
        return this.shipName;
    }

    getLength() {
        return this.shipLength;
    }

    hit() {
        this.numberOfHits += 1;
        if (this.numberOfHits === this.shipLength) this.sunk = true;
    }

    isSunk() {
        return this.sunk;
    }
}
