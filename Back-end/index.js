const express = require('express')
const routes = require('./src/routes')
const mongoose = require('mongoose')

const socketIo = require('socket.io')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerConf = require('./swagger.config')

const cors = require('cors');

require('dotenv').config();

const app = express();

const mongoUrl = process.env.MONGO_URL;

const port = process.env.PORT || 3000;

const swaggerDocs = swaggerJsDoc(swaggerConf);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
    })

app.use(cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"]
}));

app.use('/', routes);

mongoose.connect(mongoUrl).then(() => {
    console.log('Se pudo conectar correctamente a la base de datos')
    const server = app.listen(port, function() {
        console.log('app is running in port ' + port)
    }) 

    const io = socketIo(server, {
        cors:{
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', socket => {
        io.emit('alguien ve un perfil');
        //console.log('se conectó alguien');
    
        socket.on('sendMessage', (data) => {
            console.log(data)
            io.emit('newMessage', {message: data})
        })
    })

}).catch(err =>{
    console.log('No se pudo conectar a la base de datos', err)
})

module.exports = routes;