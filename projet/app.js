'use strict';

var leboncoin = require('./lib/leboncoin.js');
var meilleursagents = require("./lib/meilleursagents.js");


var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var app = express();
var http = require('http').Server(app);

var io = require('socket.io')(http);
var path = __dirname + '/views/';

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendfile(path + 'index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

io.on('connection', function (socket) {
    socket.on('sending_link', function (msg) {
        var url = msg["message"];
        console.log('link received: ' + url);

        leboncoin.getobj(url, writeInformations);
    });
});

var writeInformations = function (err, result) {
    //var lbcprix = Math.round(result.prix / result.surface, 2);
    console.log("LeboncoinJson:");
    console.log(result);
    io.emit('send_informations', "City " + result.location.city);
    io.emit('send_informations', "Postale Code: " + result.location.cp);
		io.emit('send_informations', "Type: " + result.specificities.type);
    //io.emit('send_informations', "Prix par m2: " + lbcprix + "euros");


    meilleursagents(result.location.city, result.location.cp, result.specificities.type, result.price, result.specificities.surface, function (dataM) {
        console.log("MeilleurAgentJson:");
        console.log(dataM);


				io.emit('send_estimation', "City of estimation: " + dataM.location.city);
    })

}
