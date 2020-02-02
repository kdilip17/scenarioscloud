const hapi = require('hapi');
const server = hapi.server({
    port: 3000,
    host: 'localhost'
});
const routes = require("./routes");
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var db = require('./config/db');

server.route(routes);

const startServer = async () => {
   
    mongoose.connect(db.url, { useNewUrlParser: true , useUnifiedTopology: true });
    await server.start();
    console.log(`Server is running at ${server.info.uri}`)

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    })
}

startServer();