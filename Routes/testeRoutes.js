var express = require("express");

var routes = function () {
    var bookRouter = express.Router();

    bookRouter.route("/").get(function (req, res) {
        var responseJson = {
            hello: "this is my api"
        };
        res.json(responseJson);
    });

    return bookRouter;
}

module.exports = routes;