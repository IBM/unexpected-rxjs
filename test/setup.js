'use strict';

const unexpected = require('unexpected');
const sinon = require('sinon');

global.sinon = sinon;

global.expect = unexpected.clone().use(require('unexpected-sinon'));
