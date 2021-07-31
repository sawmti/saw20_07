//Importamos la dependencia de Express 
const express = require('express');
const path = require('path');

//Importamos Mongoose 
const mongoose = require('mongoose');

//Importamos el archivo de rutas
const routes = require('./routes');

//Importamos BodyParser 
const bodyParser = require('body-parser');

//Importamos cors
const cors = require('cors');

//Creamos el servidor de Express 
const app = express()
const root = path.resolve(__dirname, '..')

//Habilitar cors 
app.use(cors());

//Conexión a MongoDB
mongoose.Promise = global.Promise;

/*mongoose.connect('mongodb://localhost:27017/convencionapp',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});*/


mongoose.connect('mongodb://localhost:27017/convencionapp',{
//mongoose.connect('mongodb+srv://admin:admin@cluster0.vyudj.mongodb.net/constituyentes?retryWrites=true&w=majority',{
//mongoose.connect('mongodb+srv://usrconvencion:1234@clusterconvencionapp.ggos6.mongodb.net/convencionapp?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Habilitamos body-parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar routing 
app.use('/api', routes())

// Log invocations
/*app.use(function(req, res, next) 
{ 
  console.log(req.url); 
  next(); 
});*/

// Directly serve static content from /client
app.use(express.static(root + '/client'));

// Simple REST API that returns some entities
app.get('/api/entities', (req,res) => 
 res.send({ entities: 
   ['Q2887', 
    'Q33986'
   ]})
);

module.exports = app