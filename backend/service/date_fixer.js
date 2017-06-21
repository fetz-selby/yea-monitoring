var sql = require('../sql'),
    dateFormat = require('dateformat');

var services = {};

services.fixb6 = function(sql){
    sql.query('select member_uuid,b6 from members',
        [], 
        function (error, results) {
            if (error) {
                console.error('error connecting: ' + error.stack);
                return;
            }

            results.forEach(function(element, index, arr){
                //filtering with date pattern
                if(element.b6 != null){
                    //console.log('Passed => '+element.b6+', member_uuid => '+element.member_uuid);
                    update(element.member_uuid, element.b6, sql);
                    //setTimeout(function(){},200);
                }
            });

            //res.status(200).send('Completed!!!');
        });
}

var update = function(member_uuid, b6, sql){
    
    b6 = getFormatedDate(b6);

    console.log('Date => '+b6);
    sql.query('update members set b6 = ? where member_uuid = ?',
        [dateFormat(b6, 'mmm dS, yyyy'), member_uuid], 
        function (error, results) {
            if (error) {
                console.error('error connecting: ' + error.stack);
                return;
            }
            //sql.end();
            console.log('Done saving !!!');
        });

}

var getFormatedDate = function(date){
    var dateTokens = date.split(',');
    if(dateTokens[0].includes('th') || dateTokens[0].includes('st') || dateTokens[0].includes('nd') || dateTokens[0].includes('rd')){
        newDate = dateTokens[0].substr(0, dateTokens[0].length-2);
        console.log('New Date => '+newDate);

        return newDate;
    }else{
        return date;
    }
}

//services.fixb6();

module.exports = services;