/**
 * executar: gulp
 * testar: gulp test, onde test é o nome da task no gulpfile.js
*/
//express: cria um servidor para a api.
//mongoose: acessa o mongo de forma transparente
//bodyParser: faz o bind do json e passa para uma prop chamada body.
var express = require("express")
    , mongoose = require("mongoose")
    , bodyParser = require("body-parser");

var dbUri;
if (process.env.ENV == "Test") {
    dbUri = "mongodb://localhost/bookAPI_test";
} else {
    dbUri = "mongodb://localhost/bookAPI";
}
var db = mongoose.connect(dbUri, { useNewUrlParser: true });

var Book = require("./Models/bookModel");


var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter = require("./Routes/bookRoutes")(Book);
testeRouter = require("./Routes/testeRoutes")();

app.use("/api/books", bookRouter);
app.use("/api/teste", testeRouter);

app.get("/", function (req, res) {
    res.send("Welcome to my API!");
});

app.listen(port, function () {
    console.log("Gulp is running on port  " + port);
});

//permite o acesso via require, para teste de integração
module.exports = app;