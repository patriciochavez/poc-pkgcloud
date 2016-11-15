var fs = require('fs');
var express = require('express');
var app = express();
var pkgcloud = require('pkgcloud'),
    _ = require('lodash');

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

        app = httpServ.createServer( processRequest ).listen( cfg.port );
    }


var cliente = pkgcloud.compute.createClient({
    provider: 'openstack', 
    username: 'admin',
    password: 'nomoresecrete',
    region: 'RegionOne',
    authUrl: 'http://10.105.231.101:5000/'
  });


app.get('/', function (req, res) {

    cliente.getImages(function(err, images) {
	res.send(images);
   });

});

