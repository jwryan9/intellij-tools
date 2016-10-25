'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bumpItUp = require('../bump-it-up');

var _bumpItUp2 = _interopRequireDefault(_bumpItUp);

var args = process.argv.slice(2);
_bumpItUp2['default'].main(args);