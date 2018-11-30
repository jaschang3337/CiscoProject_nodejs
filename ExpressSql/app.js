let express = require('express');
let app = express();

let router = require('./route/route');
let http = require('http').Server(app);
let socket =require('socket.io')(http);
let mysql = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    database : 'testdb',
    user     : 'root',
    password : 'Poro04ty!',
    insecureAuth : true
//    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT * FROM USER', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

let user_data  = new Array();
let user_roledata  = new Array();

//We are setting up our static
app.use(express.static(__dirname + "/static"));

//xontrol function serving the URL > /api
app.get('/api', router.getAllMessages);

app.get('/api/messages/:name', router.myGetSpecificUserHandler);

app.get('/api/user', function(req, res){
    connection.query('SELECT * FROM USER', function (error, results, fields) {
        if (error)
            throw error;


        results.forEach(result => {
            user_data.push(result)

        });
        console.log(user_data);
        connection.end();
        res.json(user_data);
        res.send();
    });
});

app.get('/api/user_role_map', function(req,res){
    connection.query('SELECT * FROM USER_ROLE_MAP', function (error, results, fields) {
        if (error)
            throw error;

        results.forEach(result => {
            console.log(result);

        });
    });


});

//connection.end();

app.listen(8083);