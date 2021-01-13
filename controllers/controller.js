// Required dependencies
const express = require("express");
const router = express.Router();

// Import the model (burger.js)
const burger = require("../models/burger.js");

// Create all our routers
// Get router
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        // Handlebars object
        var hbsObject = {
            burgers: data
          };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Post router
router.post("/api/burgers", function(req, res) {
    burger.insertOne(
        ["burger_name", "devoured"],
        [req.body.burger_name, req.body.devoured],
        function(result) {
            // Parse the JSON
            res.json({ id: result.insertId });
    });
});

// Put router
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.updateOne({ devoured: req.body.devoured }, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    });
});

// Delete router
router.delete(condition, function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.deleteOne(condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end();
        }
    });
});


// Export routes for server.js to use.
module.exports = router;
