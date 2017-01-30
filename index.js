var express = require('express');
var server = express();

server.get('/', function (request, respons) {
    respons.send('Hello World!');
});

server.listen(3000, function () {
    console.log('Server start');
});