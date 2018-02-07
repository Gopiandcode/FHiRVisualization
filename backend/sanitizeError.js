function sanitizeError(env, err) {
    if (!env.PRODUCTION) {
        return {error: err};
    } else {
        return {error: 'UNKNOWN'};
    }
}

module.exports = sanitizeError;