/// <reference path="node.d.ts" />
const nounFile: string = require('../../assets/nouns.txt');
const adjFile: string = require('../../assets/adjectives.txt');

const nouns: string[] = nounFile.split('\n');
const adjectives: string[] = adjFile.split('\n');

export class FileName {
    static generate(extension: string): string {
        return `${this._getRandomAdjective()}${this._getRandomAdjective()}${this._getRandomNoun()}.${extension}`;
    }

    private static _getRandomAdjective(): string {
        return adjectives[Math.floor(Math.random() * adjectives.length)];
    }

    private static _getRandomNoun(): string {
        return nouns[Math.floor(Math.random() * nouns.length)];
    }
}