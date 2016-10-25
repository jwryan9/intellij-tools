'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dieBranchesDie = require('../die-branches-die');

var _dieBranchesDie2 = _interopRequireDefault(_dieBranchesDie);

var args = process.argv.slice(2);
_dieBranchesDie2['default'].main(args);