// Required dependencies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();

// Define PORT
const PORT = process.env.PORT || 3000;

// Serve static content for the app
// from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/controller.js");

app.use(routes);

// Start the server
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});
