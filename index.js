// var http = require('http');
// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "kado_wisuda"
// });

// http.createServer(function (req, res) {
//     const route = req.url;
//     if(route === "/users") {
//         con.connect(function(err) {
//             if (err) throw err;
//             con.query("SELECT * FROM user", function (err, result, fields) {
//             if (err) throw err;
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(JSON.parse({ data: [1,2,3]}));
//             // res.write(JSON.stringify(result))
//             res.end();
//             });
//         });
//     } else {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write("bukaaan");
//         res.end();
//     }
// }).listen(8080);

// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   var sql = require("mssql");
//   var config = {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "kado_wisuda"
//   };
//   sql.connect(config, function (err) {
//     if (err) console.log(err);
//     var request = new sql.Request();
//     request.query('SELECT * FROM user', function (err, recordset) {
//       if (err) console.log(err)
//       console.log(recordset)
//       res.send(recordset);
//     });
//   });
// });

// var server = app.listen(8080, function () {
// console.log('Server is running..');
// });

var express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
var app = express();

var con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kado_wisuda"
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/users', function (req, res) {
    con.getConnection(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        res.send(result)
        res.end();
        });
    });
});

app.post('/users', function (req, res) {
    con.getConnection(function(err) {
        if (err) throw err;
        var { name, id, role, password, phone_num, email, address, username } = req.body;
        var que = "INSERT INTO user (name, id, role, password, phone_num, email, address, username) VALUES ('" + name + "'," + id + ",'" + role + "','" + password + "'," + phone_num + ",'" + email + "','" + address + "','" + username + "')";
        con.query(que, function (err, result, fields) {
            if (err) throw err;
            res.send("success");
            res.end();
        });
    });
});

app.put('/users', function (req, res) {
    const id = req.query.id;
    con.getConnection(function(err) {
        if (err) throw err;
        var { name, role, password, phone_num, email, address, username } = req.body;
        var que = "UPDATE user SET name='" + name + "',role='" + role + "',password='" + password + "',phone_num=" + phone_num + ",email='" + email + "',address='" + address + "',username='" + username + "' WHERE id = + " + id;
        con.query(que, function (err, result, fields) {
            if (err) throw err;
            res.send("success");
            res.end();
        });
    });
});

app.delete('/users', function (req, res) {
    const id = req.query.id;
    con.getConnection(function(err) {
        if (err) throw err;
        var que = "DELETE FROM user WHERE id = " + id;
        con.query(que, function (err, result, fields) {
            if (err) throw err;
            res.send("success");
            res.end();
        });
    });
});

var server = app.listen(8080, function () {
    console.log('Server is running..');
});