var fs = require('fs');
var express = require('express');
var app = express();
var pkgcloud = require('pkgcloud'),
    _ = require('lodash');
var bodyParser = require("body-parser");
var request = require('request');

var cfg = {
        ssl: true,
        port: 3000,
        ssl_key: './server.key',
        ssl_cert: './server.crt'
    };


var httpServ = ( cfg.ssl ) ? require('https') : require('http');

if ( cfg.ssl ) {

        var server = httpServ.createServer({

            key: fs.readFileSync( cfg.ssl_key ),
            cert: fs.readFileSync( cfg.ssl_cert )

        }, app).listen( cfg.port );

    } else {

        var server = httpServ.createServer( app ).listen( cfg.port );
    }

app.use(bodyParser.json());

app.get(/^(.+)$/, function(req, res){ 
	switch(req.params[0]) {
		case '/aceleracion':
			res.send();
			break;
	default: 
	}
 });

app.post(/^(.+)$/, function(req, res){ 
	switch(req.params[0]) {
		case '/getToken':
			//var usuario = new Object();
			//usuario.username = req.body.username;		
			//usuario.password = req.body.password;	
			var requestData = {"auth":{"passwordCredentials":{"username": "admin","password": "nomoresecrete"}}};

			var headers = {
				'Content-Type':'application/json'
				}	
			var options = {
 				url: 'http://10.105.231.101:5000/v2.0/tokens',
				method: 'POST',
				headers: headers,
				json: requestData
				}
			request(options, function (error, response, body) {
			    if (!error && response.statusCode == 200) {
				res.send(response);
				res.end();
			    } 
			});
			break;
	default: 
	}
 });

