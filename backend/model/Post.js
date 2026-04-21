const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Post = sequelize.define("Post", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: "users", key: "id" } },
  content: { type: DataTypes.TEXT, allowNull: false },
  media_url: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Should be an array of strings
    allowNull: true,
  },// For images, PDFs, videos (S3 URL)
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},{
    tableName: "posts", 
    timestamps: true,  
  }
);

Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = Post;
