var sql = require('../sql');

var services = {};

services.fixa15 = function(sql){
    sql.query('select household_uuid,a15,a15b from households',
        ['A'], 
        function (error, results) {
            if (error) {
                console.error('error connecting: ' + error.stack);
                return;
            }

            results.forEach(function(element, index, arr){
                //filtering with date pattern
                if(element.a15b.charAt(0) != '0'){
                    console.log('Passed => '+element.a15b);
                    update(element.household_uuid, element.a15b, sql);
                    setTimeout(function(){},2000);
                }
            });

            //res.status(200).send('Completed!!!');
        });
}

var update = function(id, a15b, sql){
    

    sql.query('update households set a15b = ? where household_uuid = ?',
        ['0'+a15b, id], 
        function (error, results) {
            if (error) {
                console.error('error connecting: ' + error.stack);
                return;
            }
            //sql.end();
            console.log('Done saving !!!');
        });

}

module.exports = services;