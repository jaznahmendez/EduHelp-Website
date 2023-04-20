const express = require('express')
const routes = require('./src/routes')
const mongoose = require('mongoose')

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerConf = require('./swagger.config')

require('dotenv').config();

const app = express();

const mongoUrl = process.env.MONGO_URL;

const port = process.env.PORT || 3000;

const swaggerDocs = swaggerJsDoc(swaggerConf);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/', routes);

mongoose.connect(mongoUrl).then(() => {
    console.log('Se pudo conectar correctamente a la base de datos')
    app.listen(port, function() {
        console.log('app is running in port ' + port)
    }) 
}).catch(err =>{
    console.log('No se pudo conectar a la base de datos', err)
})

module.exports = routes;