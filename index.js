"use strict"

const fs = require('fs');
const crypto = require('crypto');
const HexTransform  = require('./class/HexTransform').HexTransform;
const RandomReadable = require('./class/RandomReadable').RandomReadable;
const MultiplyTransform  = require('./class/MultiplyTransform').MultiplyTransform;
const ConsoleWritable  = require('./class/ConsoleWritable').ConsoleWritable;

const DATA_INPUT = './data/input.txt';
const DATA_OUTPUT = './data/output.txt';
const DATA_OUTPUT_HEX = './data/outputHex.txt';
const ALGORITHM = 'md5';
const HIGH_WATER_MARK = 1;
const MULTIPLIER = 2;

/**
 * Часть 1
 */
const partOne = () => {
    const input = fs.createReadStream(DATA_INPUT);
    const output = fs.createWriteStream(DATA_OUTPUT);

    const hash = crypto.createHash(ALGORITHM);

    let hashpipe = input.pipe(hash);
    hashpipe.pipe(process.stdout);
    hashpipe.pipe(output);

    return output;
}

/**
 * Часть 2
 */
const partTwo = () => {
    const input = fs.createReadStream(DATA_INPUT);
    const outputHex = fs.createWriteStream(DATA_OUTPUT_HEX);

    const hxtr = new HexTransform();

    let hexpipe = input.pipe(hxtr);
    hexpipe.pipe(process.stdout);
    hexpipe.pipe(outputHex);

    return outputHex;
}

/**
 * Дополнительное задание
 */
const additionalTask = () => {
    let options = {highWaterMark: HIGH_WATER_MARK};
    const rr = new RandomReadable(options);
    const mt = new MultiplyTransform(MULTIPLIER, options);
    const cw = new ConsoleWritable(options);

    console.log();
    rr.on('data', (data) => {
        console.log(`Исходные данные - ${data}`);
    })

    rr.pipe(mt).pipe(cw);
}

//Выполняем задания постепенно :)
partOne().on('finish', () => {
    partTwo().on('finish', () => {
        additionalTask();
    })
});