'use strict';

var _logLevel = require('./log-level');

function err(message) {
    console.log(message); //eslint-disable-line no-console
}

function warn(message) {
    if (process.env.LOGGER_LEVEL === _logLevel.LOG_LEVEL.WARN || process.env.LOGGER_LEVEL === _logLevel.LOG_LEVEL.DEBUG || process.env.LOGGER_LEVEL === _logLevel.LOG_LEVEL.TRACE) {
        console.log(message); //eslint-disable-line no-console
    }
}

function debug(message) {
    if (process.env.LOGGER_LEVEL === _logLevel.LOG_LEVEL.DEBUG || process.env.LOGGER_LEVEL === _logLevel.LOG_LEVEL.TRACE) {
        console.log(message); //eslint-disable-line no-console
    }
}

function trace(message) {
    if (process.env.LOGGER_LEVEL === _logLevel.LOG_LEVEL.TRACE) {
        console.log(message); //eslint-disable-line no-console
    }
}

module.exports = {
    err: err,
    warn: warn,
    debug: debug,
    trace: trace
};