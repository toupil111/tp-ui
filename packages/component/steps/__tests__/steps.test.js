'use strict';

const steps = require('..');
const assert = require('assert').strict;

assert.strictEqual(steps(), 'Hello from steps');
console.info('steps tests passed');
