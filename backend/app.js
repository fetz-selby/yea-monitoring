var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    sql = require('./sql'),
    Pusher = require('./push_config'),
    pusher = Pusher.pusher(),
    port = process.env.PORT || 8001;
    
var app = express();
//var smsDispatcher = require('./service/sms_gateway');

//Instantiating all routes
var memberRoute = require('./routes/member_router')(sql()),
    userRoute = require('./routes/users_router')(sql());
//Set middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({resave:true, saveUninitialized: true, 
                secret: 'thequickbrownfoxjumpedoverthelazydog',
                cookieName: 'session',
                duration: 30*60*1000, 
                activeDuration: 5*60*1000, 
                httpOnly: true, 
                cookie: {secure: false }}));

//CORS enabling
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//Disable cache
app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

//Middleware to check for user validity
// app.use('/api/esoko/*', function(req, res, next){
    
//     if(req.query.email && req.query.password){
        
//     sql().query('select id,level from users where email=? and password=?',
//               [req.query.email, require('./service/utils').getHash(req.query.email+req.query.password)], 
//               function (error, results) {
//                 if (error) {
//                     console.error('error connecting: ' + err.stack);
//                     return;
//                 }

//                 if(results.length === 1 && results[0].id > 0){
//                         req.query.level = results[0].level;
//                         req.query.userId = results[0].id;
//                         next();  
//                     }else{
//                         res.status(200).json([]);
//                 }
//     });
        
        
//     }else{
//         res.status(400).send('Please provide correct email and password');
//     }
// })

app.use('/api/yea/members', memberRoute.router);
app.use('/api/yea/users', userRoute.router);


//app.use('/api/esoko/leap', leapRoute.router);


//app.use('/api/esoko/sessions', sessionRoute.router);

app.get('/api', function(req, res){
    res.status(200).send('Please check API documentation');
});

app.get('/', function(req, res){
    res.status(200).send('Please check API documentation');
});

app.listen(port, function(){
    console.log('Running on PORT '+port);

    //Init all events
    initAllEvents();
});



var initAllEvents = function(){
    
    //Household Events
    // householdRoute.event.on('add', function(data){
    //     console.log('Household Added !!!');
    // });
    
    // householdRoute.event.on('delete', function(data){
    //     console.log('Household Deleted !!!');
    // });
    
    // //Members Events
    // memberRoute.event.on('add', function(data){
    //     //pusher.trigger('approve_approved', 'add', data);
    //     console.log('Member Added!!!');
    // });
    
    // memberRoute.event.on('delete', function(data){
    //     console.log('Member Deleted!!!');
    // });
}