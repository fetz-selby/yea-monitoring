var sql = require('../sql');

var services = {},
    bad_ids = [],
    counter = 0;

services.fix_duplicates = function(sql){
    sql.query('select household_uuid from new_members',
        [], 
        function (error, results) {
            if (error) {
                console.error('error connecting: ' + error.stack);
                return;
            }

            counter = 0;
            results.forEach(function(element, index, arr){
              compareIfExist(element.household_uuid, sql);

              if(counter == arr.length){
                console.log('duplicate counts => '+bad_ids);
              }
            });

            //res.status(200).send('Completed!!!');

        });
}

var compareIfExist = function(household_uuid, sql){
    
    sql.query('select id,b1,b2 from new_members where household_uuid = ?',
        [household_uuid], 
        function (error, results) {
            if (error) {
                console.error('error connecting: ' + error.stack);
                return;
            }

            counter ++;
            if(results.length > 1){
                //Compare names
                var f_names = [],
                    l_names = [];

                results.forEach(function(element, i, arr){

                    var fname = element.b1.toLowerCase(),
                        lname = element.b2.toLowerCase();

                    if(f_names.includes(fname) && l_names.includes(lname)){
                        //Keep id
                        bad_ids.push(element.id);
                        console.log('Already exist ::: id => '+element.id+', fname => '+fname+', lname => '+lname);
                    }else{
                        f_names.push(fname);
                        l_names.push(lname);
                    }

                })
            }
        });

}

module.exports = services;