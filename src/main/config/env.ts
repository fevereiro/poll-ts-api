export default {
    mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017',
    port: process.env.PORT || 5050,
    jwtSecret: process.env.JWT || 'tUz10F@'
}