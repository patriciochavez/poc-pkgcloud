var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var request = require('request');

var cfg = {
        ssl: true,
        port: 3000,
        ssl_key: './server.key',
        ssl_cert: './server.crt'
    };


var httpServ = ( cfg.ssl ) ? require('https') : require('http');
var url_compute = 'http://10.105.231.101:8774/v2.1/';

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
		case '/servers':
			var headers = {
				'Content-Type':'application/json',
				'X-Auth-Token': req.body.tokenid
				}	
                        var options = {
                                url: url_compute + req.body.tenantid + '/servers' ,
                                headers: headers
                                }
                        request(options, function (error, response, body) {
			console.log(body);
                            if (!error && response.statusCode == 200) {
                                res.status(200).send(body);
                            } else {
                                res.status(404);
                                }
                                res.end();
                        });
                        break;
	default: 
	}
 });

app.post(/^(.+)$/, function(req, res){ 
	switch(req.params[0]) {
		case '/tokens':
			var requestData = {"auth":{"passwordCredentials":{"username": req.body.username,"password": req.body.password}}};
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
				var tokenid = (body.access.token.id);
				res.status(200).send(tokenid);
			    } else {
				res.status(404);
				} 
				res.end();
			});
			break;
		case '/instancias':
			
			break;
	default: 
	}
 });

function handleServerResponse(err, server) {
  if (err) {
    console.dir(err);
    return;
  }
};
