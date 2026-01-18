const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables. Please create a .env file with MONGODB_URI.');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error.message.includes('ECONNREFUSED') || error.message.includes('connect')) {
      console.error('\n❌ MongoDB Connection Error:');
      console.error('   MongoDB is not running or not accessible.');
      console.error(`   Attempted to connect to: ${process.env.MONGODB_URI || 'undefined'}`);
      console.error('\n   To fix this:');
      console.error('   1. Make sure MongoDB is installed on your system');
      console.error('   2. Start MongoDB service:');
      console.error('      - Windows: net start MongoDB (or start MongoDB service from Services)');
      console.error('      - Mac/Linux: sudo systemctl start mongod (or brew services start mongodb-community)');
      console.error('   3. Or update MONGODB_URI in .env to point to a running MongoDB instance');
      console.error('\n');
    } else {
      console.error(`\n❌ MongoDB Connection Error: ${error.message}\n`);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
