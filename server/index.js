require('dotenv').config()
//import dotenv 

const   express = require('express'),
        session = require('express-session');

//bring in all the packages/dependencies these are for non-server things.

const massive = require('massive');

//connects to the server and db

const   app=express(),
        {SERVER_PORT,MASSIVE_CONNECTION,SESSION_SECRET} = process.env;

app.use(express.json()); 
//you can use bodyparser too

app.use(session({
    secret: SESSION_SECRET,
    resave:true,
    //if you want more persistent sessions (so if you close the window/browser you should still be able to stay logged in)
    saveUninitialized:true,
    //whether it will create a session for you
    cookie:{
        maxAge:1234567890
    }
}))

const ctrl = require('./controllers/controller')
//connect to the controller

massive(MASSIVE_CONNECTION).then(db=>{
    app.set('db',db);
    app.listen(SERVER_PORT,()=>{console.log(`I'm listening...on ${SERVER_PORT}`)})
    //if you move the listen into massive you don't want your server to start if your db doesn't even work

})


//endpoints
app.post('/auth/register',ctrl.register);
app.post('/auth/login',ctrl.login);
app.get('/api/current',ctrl.getUser);
app.post('/auth/logout',ctrl.logout)