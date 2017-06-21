
var config = function(){
    var mysql = require('mysql');
    
    //var connection = mysql.createConnection('mysql://mysql:3306/leap_household?user=leap&password=leap&autoReconnect=true');
    var connection = mysql.createConnection('mysql://127.0.0.1:3306/yea?user=root&autoReconnect=true');


    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        //console.log('connected as id ' + connection.threadId);
    });
    
    return connection;
    
};

module.exports = config;