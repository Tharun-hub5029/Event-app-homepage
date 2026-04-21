const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./user');

const Connection = sequelize.define("connection", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    senderId: { type: DataTypes.INTEGER, allowNull: false },
    receiverId: { type: DataTypes.INTEGER, allowNull: false }, 
    status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
    }
});


User.hasMany(Connection, { foreignKey: "senderId", as: "sentRequests" });
User.hasMany(Connection, { foreignKey: "receiverId", as: "receivedRequests" });

Connection.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Connection.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

module.exports = Connection;