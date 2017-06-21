var express = require('express'),
    event = require('events').EventEmitter;

var routes = function(sql){
    var userRouter = express.Router(),
        EventEmitter = new event();

    userRouter.route('/')
                .get(function(req, res){
                    //Get response for household
                   

                    if(req.query.username && req.query.password){
                        var user = req.query.username+'',
                            password = req.query.password+'';

                        sql.query('select id,fname,lname,email from users where email = ? and password = ? and status = ?',
                        [user.toLowerCase().trim(), password.trim(),'A'], 
                        function (error, results) {
                            if (error) {
                                console.error('error connecting: ' + error.stack);
                                return;
                            }
                            res.status(200).json(results);
                        });
                    }else{
                        console.log('Wrong');
                        res.status(201).send('Details required');
                    }

                    
                   
                    })
                
                .post(function(req, res){
                        //Post response for 
        
                 })
    
    return {router: userRouter, event: EventEmitter};
};

module.exports = routes;