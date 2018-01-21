var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);
require ("./assignment/app.js")(app);

//  Set the environment variables
var ip = process.env.LANDING_PORT_8080_TCP_ADDR || '127.0.0.1';
var port = process.env.LANDING_SERVICE_PORT_8080_TCP|| 3000;
console.log(ip);
console.log(port);
console.log(process.env.OPENSHIFT_MONGODB_DB_URL);
app.listen(port, ip);