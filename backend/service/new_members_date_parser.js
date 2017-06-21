var dateFormat = require('dateformat'),
    sql = require('../sql');

var services = {};

services.formatDates = function(){
    sql().query('select id,b6 from new_members where status = ?',
        ['A'], 
        function (error, results) {
            if (error) {
                console.error('error connecting: ' + error.stack);
                return;
            }

            results.forEach(function(element, index, arr){
                //filtering with date pattern
                if(element.b6.includes('GMT')){
                    update(element.id, element.b6);
                }
            });

            //res.status(200).send('Completed!!!');
        });
}

var update = function(id, date){
    console.log('Date : '+date);
    var tmpDate = new Date(date);
    var parsedDate  = dateFormat(tmpDate, 'mmm dS, yyyy');

    sql().query('update new_members set b6 = ? where id = ?',
        [parsedDate, id], 
        function (error, results) {
            if (error) {
                console.error('error connecting: ' + error.stack);
                return;
            }
            console.log('Done saving !!!');
        });

}

module.exports = services;