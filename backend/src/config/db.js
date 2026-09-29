const mongoose = require('mongoose');

const env = require('./env');

async function connectDatabase() {
    try {
        await mongoose.connect(env.mongodbUri);

        console.log('MongoDB connected successfully');
        console.log(`Database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error('MongoDB connection failed');
        console.error(error.message);

        process.exit(1);
    }
}

module.exports = connectDatabase;
