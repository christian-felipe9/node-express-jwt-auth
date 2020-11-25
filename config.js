module.exports = {
    jwtConfig: {
        SECRET: 'Authentication123',
        MAX_AGE: 3 * 24 * 60 * 60
    },
    cookieConfig: {
        MAX_AGE: 3 * 24 * 60 * 60 * 1000
    },
    mongoDB: {
        URI: 'mongodb+srv://Christian:christian001@cluster.qxk0k.gcp.mongodb.net/node-auth'
    }
}