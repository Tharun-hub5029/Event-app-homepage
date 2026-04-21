const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  university_email: { type: DataTypes.STRING, allowNull: false, unique: true },
  personal_email: { type: DataTypes.STRING, allowNull: false },
  full_name: { type: DataTypes.STRING, allowNull: false },
  Gender :{type :DataTypes.STRING,allowNull:false},
  contact_number: { type: DataTypes.STRING, allowNull: false },
  skills: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  interests: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
  profile_pic: { type: DataTypes.STRING, allowNull: true }, // S3 URL
  role:{type:DataTypes.STRING,allowNull:false},
},{
  tableName: "users", 
  freezeTableName: true 
});

module.exports = User;
