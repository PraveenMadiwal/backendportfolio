const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Praveen@1",
  database: "chatbotdb",
});

db.connect((err) => {
  if (err) {
      console.error('❌ MySQL Connection Failed:', err);
      process.exit(1);
  }
  console.log('✅ MySQL Connected');
});


module.exports = db;
