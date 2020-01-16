const express = require('express');
const app = express();
const cookieParser =require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');


app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
//use express router


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is userd to strore the session cookie in the db
app.use(session({
     name: 'codeial',
     //todo change the secret before deploymentin production
     secret:'blahsomething',
     saveUninitialized:false,// when identity is not established 
     resave:false,//dont want to save it again and again
     cookie:{
         maxAge: (1000*60*100)
        },
    store : new MongoStore(
        {
        
            mongooseConnection:db,
            autoRemove: 'disabled'
        
    },
    function(err)
    {
        console.log(err || 'connect-mongo setup ok');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express routes
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`)
    }
    console.log(`server is running on port : ${port}`)
});