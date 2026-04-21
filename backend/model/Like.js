const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Post = require("./Post");

const Like = sequelize.define("Like", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
  postId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "posts", key: "id" } }
},{
    tableName: "likes", 
    timestamps: true, 
  });

Like.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Like.belongsTo(Post, { foreignKey: "postId", onDelete: "CASCADE" });

module.exports = Like;
