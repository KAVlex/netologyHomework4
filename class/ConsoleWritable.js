"use strict"

const Writable = require("stream").Writable;

class ConsoleWritable extends Writable {

    _write(chunk, encoding, done) {
        console.log(`Полученные данные - ${chunk}`);
        console.log('============================');
        done();
    }
}

module.exports = {
    ConsoleWritable
};