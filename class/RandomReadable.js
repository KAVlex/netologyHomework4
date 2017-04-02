"use strict";

const Readable  = require("stream").Readable;

class RandomReadable extends Readable {

    constructor(options) {
        if (!options) options = new Object();
        options.objectMode = true;
        super(options);
    }

    _read(size) {
        this.push(this.random(1, 100));
    }

    random(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }
}

module.exports = {
    RandomReadable
};