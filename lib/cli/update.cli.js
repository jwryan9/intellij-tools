'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _updateScript = require('../update-script');

var _updateScript2 = _interopRequireDefault(_updateScript);

var args = process.argv.slice(2);
_updateScript2['default'].main(args);