const User = require("./user");
const Post = require('./Post');
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Comment = sequelize.define("Comment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
    postId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "posts", key: "id" } },
    text: { type: DataTypes.TEXT, allowNull: true }
  },
  {
    tableName: "comments", 
    timestamps: true,   
  });
  
  Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
  Comment.belongsTo(Post, { foreignKey: "postId", onDelete: "CASCADE" });
  
  module.exports = Comment;
  