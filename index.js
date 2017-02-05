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
        //data = doc;
        //data = Object.keys(doc).map( function (k) {return doc[k];} );
        //console.dir(doc[0]);
        var data = doc[0] || [[],[],[],[],[],[],[],[]];
        data = Object.keys(data).map( function (k) {return data[k];} );
        // var i=0, data=[];
        // for (var ob in doc[0]) {if (i<8) data.push(ob); console.dir('**'+ob); i++}
        //data[i++]=ob;
        //console.dir(data);
        data.pop();
        response.json(data);
    });

});

server.post('/save', function (request, response) {

    data = request.body;
    let dataForSave = Object.assign({}, data);
    let td = db.get().collection('todolist');
    td.remove({});
    console.dir(dataForSave);
    td.insert(dataForSave);

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