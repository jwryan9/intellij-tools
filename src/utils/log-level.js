const loglevels = {
    ERR: 'ERR',
    WARN: 'WARN',
    DEBUG: 'DEBUG',
    TRACE: 'TRACE'
};

module.exports = {
    LOG_LEVEL: loglevels,

    setLogLevel(level) {
        process.env.LOGGER_LEVEL = loglevels[level] ? loglevels[level] : loglevels.ERR;
    }
};
