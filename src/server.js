'use strict';

const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Require middleware handeError
const handle404 = require('./middleware/404');
const handle500 = require('./middleware/500');
// Require Router
const userRouter = require('./auth/router');


app.get('/', (req, res)=>{
    //console.log('SERVER CHECK ...', req.body);
    res.send("You Will Never Walk Alone Liverpool");
});

// Use Router
app.use(userRouter);

// Handle error
// 404
app.use('*', handle404);
// 500
app.use(handle500);

function start(PORT){
    app.listen(PORT, ()=>{
        console.log(`Server on port ${PORT}`);
    });
}

module.exports = {
    server: app,
    start: start
}