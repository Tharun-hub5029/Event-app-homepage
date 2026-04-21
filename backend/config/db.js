const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");
    console.log(sequelize.getDatabaseName());
  } catch (error) {
    console.error("DB Connection failed:", error);
  }
})();

module.exports = sequelize;
