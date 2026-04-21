const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const University = sequelize.define("University", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: "universities",
  timestamps: false,
});

module.exports = University;
