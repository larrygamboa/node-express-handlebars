// Set up MySQL connection

// Required dependencies
const mysql = require("mysql");

// Connect to database
if (process.env.JAWSDB_URL) {
  const connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "l@rG020979!",
    database: "burgers_db"
  });
}

// Make sure connection works
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use
module.exports = connection;
