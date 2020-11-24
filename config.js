module.exports = {
    jwtConfig: {
        SECRET: 'Authentication123',
        MAX_AGE: 3 * 24 * 60 * 60
    },

    cookieConfig: {
        MAX_AGE: 3 * 24 * 60 * 60 * 1000
    }
}