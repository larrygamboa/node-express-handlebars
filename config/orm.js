// Import MySQL connection
const connection = require("../config/connection.js");

// Helper function for SQL syntax
function printQuestionMarks(num) {
    // Create empty array
    var arr = [];
    // Fill array with loop of question marks
    for (var i = 0; i < num; i++) {
        arr.push("?")
    }
    // Return array to a string
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    // Create empty array
    var arr = [];
    // Check to skip hidden properties
    for (var key in obj) {
        var value = obj[key];
        // If string with spaces, add quotations
        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    // Return array to a string
    return arr.toString()
}

// Object for all our SQL statement functions
var orm = {
    // Display all burgers in the database
    selectAll: function(table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        
        // Run connection query
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    // Add a burger to the database
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        // Run connection query
        connection.query(queryString, vals, function(err, res) {
            if (err) {
                throw err;
            }
            cb (res);
        });
    },
    // Update a burger status
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        // Run connection query
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb (res);
        });
    },
    // Delete a burger from database
    deleteOne: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        // Run connection query
        connection.query(queryString, function(err, res) {
            if (err) {
                throw err;
            }
            cb (res);
        });
    }
};

// Export the orm object for the model
module.exports = orm;
