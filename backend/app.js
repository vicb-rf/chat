require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');

const http = require('http');
const path = require('path');
const cors = require('cors');


const app = express();
const server = http.createServer(app);

const dbConnection = require('./server/db/mongoconec');
const port = process.env.PORT || 3000;

//conectar a mongo
(async function conectarDB(){
    await dbConnection();
})();

//middleware
app.use(express.urlencoded({ extended: true })) 
app.use(express.json())
app.use(cors());

//routes
app.use('/', require('./server/routes/auth.route'));
app.use('/usuarios', require('./server/routes/usuario.route'));

app.use('*', (req, res) => {
    return res.status(404).json({ msg: 'Endpoint no existe'})
});

module.exports.io = socketIO(server);
require('./server/sockets/socket');

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);

});