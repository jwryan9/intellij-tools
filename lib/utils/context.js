"use strict";

var contenxt = {};

module.exports = {
    get: function get(key) {
        return contenxt[key];
    },
    put: function put(key, value) {
        contenxt[key] = value;
    }
};