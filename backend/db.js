var mysql = require('mysql');

var connectionTest = mysql.createConnection({
    host: "sql7.freesqldatabase.com",
    user: "sql7727976",
    password: "zTUGi9BY7E",
    database: 'sql7727976',

});
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'maison',

});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
module.exports = connection;