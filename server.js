var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");
var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

/*app.use(function(req, res, next) {
  var allowedOrigins = ['https://prj-redsquare.herokuapp.com/','https://redsquare-prj.netlify.com','http://127.0.0.1:8080','http://localhost:8080'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});*/

const mongoURI =
  "mongodb://lezardscreation:" +
  process.env.MONGO_ATLAS_PW +
  "@atelierd.jeyms.mongodb.net/AtelierDAPI?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

var Clim = require("./routes/Clim");
var PSH = require("./routes/PSH");

app.use("/clim", Clim);
app.use("/psh", PSH);

const server = app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
