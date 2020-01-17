const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: "remotemysql.com",
    user: "Be7SjtduHi",
    password:"fwJLtX1Vd9",
    database: 'Be7SjtduHi',
    multipleStatements: true
  });


  mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


module.exports = mysqlConnection;