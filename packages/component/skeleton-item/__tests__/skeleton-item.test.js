'use strict';

const skeletonItem = require('..');
const assert = require('assert').strict;

assert.strictEqual(skeletonItem(), 'Hello from skeletonItem');
console.info('skeletonItem tests passed');
