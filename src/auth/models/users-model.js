'use strict';
require('dotenv').config();
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;



const { Sequelize, DataTypes } = require('sequelize');

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ?
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    } : {};


const sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const Users = sequelize.define('adduser', {
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = {
    sequelize: sequelize,
    Users: Users
}