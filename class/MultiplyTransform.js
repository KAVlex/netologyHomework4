"use strict"

const Transform  = require('stream').Transform;

/**
 * Уменожает полученное число на multiplier
 */
class MultiplyTransform extends Transform {

    constructor(multiplier, options) {
        if (!options) options = new Object();
        options.objectMode = true;
        super(options);
        this.multiplier = multiplier;
    }

    _transform(chunk, encoding, done) {
        let result = null, error = null;
        try{
            result = parseInt(chunk.toString()) * this.multiplier;
        }catch (e){
            error = e.message;
        }
        setTimeout(() => {
            done(error, result);
        }, 1000);
    }

}

module.exports = {
    MultiplyTransform
};