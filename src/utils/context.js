var contenxt = {};

module.exports = {
    get(key) {
        return contenxt[key];
    },
    put(key, value) {
        contenxt[key] = value;
    }
};
