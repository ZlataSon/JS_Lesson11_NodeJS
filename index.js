var express = require('express');
var db = require('./db');
var parser = require('body-parser');
var server = express();

server.use(parser.urlencoded());
server.use(parser.json());

server.use(express.static('./clients'));

server.post('/load', function (request, response) {

    let td = db.get().collection('todolist');
    let data;
    td.find().toArray(function (err,doc) {
        data = doc;
        response.json(data);
    });

});

server.post('/save', function (request, response) {
    data = request.body;

    let td = db.get().collection('todolist');
    td.remove({});
    td.insert(data);

    response.json({status:'ok'});
});

db.connect('mongodb://localhost:27017/db_todolist', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        server.listen(3000, function() {
            console.log('Server start');
        })
    }
});
