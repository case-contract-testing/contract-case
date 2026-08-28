'use strict';

// A module that loads successfully but isn't a ContractCase plugin, for
// testing the error message users get when they load the wrong package.
module.exports = { some: 'data', that: ['is', 'not', 'a', 'plugin'] };
