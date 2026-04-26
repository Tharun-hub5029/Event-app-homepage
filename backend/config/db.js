const { Sequelize } = require("sequelize");

// DO NOT rely on dotenv in production
// It works locally, but Render uses dashboard env variables

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing. Set it in Render environment variables.");
  process.exit(1);
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Test connection
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
    console.log("📦 DB Name:", sequelize.getDatabaseName());
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
