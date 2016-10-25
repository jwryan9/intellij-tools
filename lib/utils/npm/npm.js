'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _install = require('./install');

var _install2 = _interopRequireDefault(_install);

var _prune = require('./prune');

var _prune2 = _interopRequireDefault(_prune);

var _bump = require('./bump');

var _bump2 = _interopRequireDefault(_bump);

var _listScripts = require('./list-scripts');

var _listScripts2 = _interopRequireDefault(_listScripts);

var _unlinkAll = require('./unlink-all');

var _unlinkAll2 = _interopRequireDefault(_unlinkAll);

module.exports = {
    install: _install2['default'],
    prune: _prune2['default'],
    unlinkAll: _unlinkAll2['default'],
    bump: _bump2['default'],
    listScripts: _listScripts2['default']
};