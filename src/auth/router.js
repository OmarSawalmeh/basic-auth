'use strict';

const  { Users } = require('./models/users-model');
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const usersRouter = express.Router();

usersRouter.get('/');
usersRouter.post('/signup', signUp);
usersRouter.post('/signin', signIn);


async function signUp(req, res){
    //console.log('ROUTER CHECK ...', req.body);
    try{
        let username = req.body.username;
        
        let password = await bcrypt.hash(req.body.password, 10);
        
        const record = await Users.create({
            username: username,
            password: password
        });
        res.status(201).json(record);
    }
    catch(error){
        res.status(403).send('Error Creating User');
    }
}

async function signIn(req, res){
    if(req.headers.authorization){
        let headerEncoded = req.headers.authorization.split(' ')[1];
        let headerDecoded = base64.decode(headerEncoded);

        let username = headerDecoded.split(':')[0];
        let password = headerDecoded.split(':')[1];

        try{
            let user = await Users.findOne({where:{username:username}});
            let validCheck = await bcrypt.compare(password, user.password);

            if(validCheck){
                res.status(200).json({user});
            }
            else{
                res.status(500).send('Wrong username or password');
            }
        }
        catch(error){
            res.status(403).send('Invalid Login');
        }
    }
}

module.exports = usersRouter;