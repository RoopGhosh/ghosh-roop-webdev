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
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
console.log("this is open shift ip");
console.log(process.env.OPENSHIFT_NODEJS_IP );
console.log("this is openshift port");
console.log(process.env.OPENSHIFT_NODEJS_PORT );
console.log(ip);
console.log(port);
console.log(process.env.OPENSHIFT_MONGODB_DB_URL);
app.listen(port, ip);