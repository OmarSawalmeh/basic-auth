'use strict';

const { sequelize } = require('./src/auth/models/users-model')
const server = require('./src/server');

require('dotenv').config();
const port = process.env.PORT || 3000;

sequelize.sync().then(()=>{
    server.start(port);
}).catch(error=>{
    console.error('Server error', error.message);
});


console.log('ynwa');