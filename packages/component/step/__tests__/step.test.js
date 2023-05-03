'use strict';

const step = require('..');
const assert = require('assert').strict;

assert.strictEqual(step(), 'Hello from step');
console.info('step tests passed');
