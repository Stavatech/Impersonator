const crypto = require('crypto');
const base64url = require('base64url');

const generateToken = (size) => {
    return base64url(crypto.randomBytes(size));
};

const clearToken = (sessions, token) => {
    let proc = sessions[token];
    if (proc !== undefined) {
        proc.close();
        delete sessions[token];
    }
};

const expireToken = (sessions, token, ttl) => {
    let msTTL =  ttl * 1000

    let timeout = setTimeout(() => {
        clearToken(sessions, token);
    }, msTTL);

    let currentTime = new Date().getTime();
    let expiryTime = currentTime + msTTL;

    return { timeout, expiryTime };
};

const resetTokenTimeout = (proc, sessions, token) => {
    clearTimeout(proc.timeout.timeout);
    proc.timeout = expireToken(sessions, token, proc.ttl);
};

module.exports = {
    generateToken,
    clearToken,
    expireToken,
    resetTokenTimeout
}
