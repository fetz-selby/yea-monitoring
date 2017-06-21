var express = require('express'),
    event = require('events').EventEmitter,
    dateFormat = require('dateformat');

var routes = function(sql){
    var memberRouter = express.Router(),
        EventEmitter = new event();

    memberRouter.route('/')
                .get(function(req, res){
                    //Get response for household

                        sql.query('select * from yea where status = ?',
                            ['A'], 
                            function (error, results) {
                                if (error) {
                                    console.error('error connecting: ' + error.stack);
                                    return;
                                }
                                   res.status(200).json(results); 
                        });
                   
                    })
                .put(function(req, res){
                        //Post response for members
                        //var members = req.body.data;

                        var members = [];
                        

                        if(members != null && members.length > 0){
                            members.forEach(function(member, index, arr){
                                var queryMonitor = 0;
                                //update member
                                var dob = dateFormat(member.b6, 'mmm dS, yyyy');

                                sql.query('',
                                    [member.b4b, member.b7, member.b8, member.b10, member.b11, member.b12, member.b13, member.b14, member.b15, member.b5, dob, member.id, 'A'], 
                                    function (error, results) {
                                      if (error) {
                                            console.error('error connecting: ' + error.stack);
                                            return;
                                       }

                                       queryMonitor ++;
                                       if(queryMonitor == arr.length){
                                            res.status(200).send('Members updated successfully');
                                       }
                                });
                            });
                        }
        
                })
                .post(function(req, res){
                    //Post response for parent_constituencies
                    res.status(200);

                });
    
     memberRouter.route('/district/:name')
                .get(function(req, res){
                    var name = req.params.name;
                              
                    sql.query('select * from yea where district like ? and status = ?',
                    ['%'+name+'%', 'A'], 
                        function (error, results) {
                            if (error) {
                                console.error('error connecting: ' + error.stack);
                                return;
                            }
                               res.status(200).json(results); 
                    });
                             
                }); 
    
//foot rob,snails,back massage,ice cream

     memberRouter.route('/mobile/:id')
                .get(function(req, res){
                    var phone = req.params.id;
                              
                    sql.query('select * from yea where msisdn like ? and status = ?',
                    ['%'+phone+'%', 'A'], 
                        function (error, results) {
                            if (error) {
                                console.error('error connecting: ' + error.stack);
                                return;
                            }
                               res.status(200).json(results); 
                    });
                             
                }); 

     memberRouter.route('/prog/:name')
                .get(function(req, res){
                    var name = req.params.name;
                              
                    sql.query('select * from yea where prog_module like ? and status = ?',
                    ['%'+name+'%', 'A'], 
                        function (error, results) {
                            if (error) {
                                console.error('error connecting: ' + error.stack);
                                return;
                            }
                               res.status(200).json(results); 
                    });
                             
                });

     memberRouter.route('/institution/:name')
                .get(function(req, res){
                    var name = req.params.name;
                              
                    sql.query('select * from yea where inst_name like ? and status = ?',
                    ['%'+name+'%', 'A'], 
                        function (error, results) {
                            if (error) {
                                console.error('error connecting: ' + error.stack);
                                return;
                            }
                               res.status(200).json(results); 
                    });
                             
                });

    memberRouter.route('/:id')
                .get(function(req, res){
                    var id = req.params.id;
                    if(id){
                        sql.query('select * from yea where id = ? and status = ?',
                        [id, 'A'], 
                        function (error, results) {
                            if (error) {
                                console.error('error connecting: ' + error.stack);
                                return;
                            }
                               res.status(200).json(results); 
                        });
                         
                    }else{
                        res.status(400).send('Please ID should be greater than zero(0)');
                    }               
                });
    
    return {router: memberRouter, event: EventEmitter};
};


module.exports = routes;