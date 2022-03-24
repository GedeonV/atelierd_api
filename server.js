const dotenv = require('dotenv').config();
const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
const bodyParser = require("body-parser");
const listEndpoints = require("express-list-endpoints");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

app.use(fileUpload({
  createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*app.use(function(req, res, next) {
  const allowedOrigins = ['https://prj-redsquare.herokuapp.com/','https://redsquare-prj.netlify.com','http://127.0.0.1:8080','http://localhost:8080'];
  const origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});*/

const mongoURI = `mongodb+srv://lezardscreation:${process.env.MONGO_ATLAS_PW}@atelierd.jeyms.mongodb.net/AtelierDAPI?retryWrites=true&w=majority`;

mongoose
.connect(mongoURI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log('Erreur : ', err));
const Clim = require("./routes/Clim");
const PSH = require("./routes/PSH");
const { route } = require('./routes/PSH');

app.use("/clim", Clim);
app.use("/psh", PSH);

const server = app.listen(port, function () {
  console.log("Server is running on port: " + port);
});




app.set('views', './views')
app.set('view engine', 'pug');
app.get('/', function (req, res) {
  const endpoints = listEndpoints(app)
  let routes = {}

  var fullUrl = req.protocol + '://' + req.get('host');
  endpoints.map((d) => {
    routes[d.path] = fullUrl + d.path
  })

  console.log(routes)

  res.render('index', { 
    title: 'AtelierD - API', 
    message: 'Liste des routes',
    routes: routes
  });
});