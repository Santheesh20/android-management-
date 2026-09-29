const app = require('./app');

const env = require('./config/env');
const connectDatabase = require('./config/db');

async function startServer() {
    await connectDatabase();

    app.listen(env.port, function () {
        console.log(`TV-Max Connect backend running on port ${env.port}`);
    });
}

startServer();
