

var service = function(sql){
    var service = {};
    
    service.calculateRatios = function(results, res){
        if(results.length > 0){
            var total = 0,
                threshold_100 = 100,
                threshold_360 = 360,
                threshold_400 = 400;
        
            var candidates = [];
        
            //Get total votes
            console.log(results);
            results.forEach(function(element, index, array){
                var candidate = element;
                
                if(candidate.votes){
                    total = parseInt(candidate.votes) + total;
                }
            });
            
            console.log('Total => '+total);

        
            //Calculat all ratios
            results.forEach(function(element, index, array){
                var candidate = element,
                    candidateThres_100 = (parseInt(candidate.votes)/total)*threshold_100,
                    candidateThres_360 = (parseInt(candidate.votes)/total)*threshold_360,
                    candidateThres_400 = (parseInt(candidate.votes)/total)*threshold_400;
            
                
                console.log('Percentage => '+candidateThres_100);
                console.log('Angle => '+candidateThres_360);
                console.log('Bar Ratio => '+candidateThres_400);
                
                candidate.percentage = candidateThres_100;
                candidate.angle = candidateThres_360;
                candidate.bar = candidateThres_400;
            
                candidates.push(candidate);
            });
            
            updateCandidate(res, sql, candidates);
        
        }
    };
    
    // service.calculateRatiosWithConstituencyId = function(res, consId, type){
    //     if(consId){
           
    //          sql.query('select id,votes,group_type from candidates where constituency_id = ? and group_type = ?',
    //           [consId, type], 
    //           function (error, results) {
    //             if (error) {
    //                 console.error('error connecting: ' + error.stack);
    //                 return;
    //             }

    //             if(results){
    //                 service.calculateRatios(results, res);
    //             }
    //         });
    //     }
    // }
    
    return service;
}

var updateCandidate = function(res, sql, candidates){
     if(candidates.length > 0){
            var counter = 0;
            candidates.forEach(function(element, index, array){
                var candidate = element;
                
                if(isNaN(candidate.percentage)){
                    candidate.percentage = 0;
                }
                                
                sql.query('update candidates set percentage = ? where id = ?',
                [candidate.percentage, candidate.id], 
                function (error, results) {
                    if (error) {
                        console.error('error connecting: ' + error.stack);
                        return;
                    }

                    counter ++;
                    if(counter == candidates.length){
                        res.status(200).send('success');
                    }
                    
                });
                
            });
        }
}

module.exports = service;