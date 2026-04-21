const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./user');
const Post = require('./Post');


const SavedPost =sequelize.define('SavedPost',{
    id :{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            
        }
    },
    postId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Post,
         
        }
    },
},
    {
        freezeTableName:true,
        tableName:'savedposts',
    }
);
   
module.exports = SavedPost;