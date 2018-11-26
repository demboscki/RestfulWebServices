var express = require("express");

//permitir que a model seja passada por parametro facilita os testes.
var routes = function (Book) {
    var bookRouter = express.Router();
    var bookController = require("../Controllers/bookController")(Book);

    bookRouter.route("/SemFiltro")
        .get(function (req, res) {
            var query = req.query;
            Book.find(query, function (err, books) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(books);
                }
            });
        });


    bookRouter.route("/")
        .post(bookController.post)
        .get(bookController.get);

        //para todos que usam essa rota, terão o objeto e propriedade req.book setados.
    bookRouter.use("/:bookId", function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                next();
            } else {
                res.status(404).send("not found");
            }
        });
    });
    bookRouter.route("/:bookId")
        .get(function (req, res) {
            //get = select
            var returnBook = req.book.toJSON();
            returnBook.links = {};
            var link="http://" + req.headers.host + "/api/books?genre=" + returnBook.genre;
            returnBook.links.filterByGenre=link.replace(" ", "%20");
            res.json(returnBook);
        })
        .put(function (req, res) {
            //put = replace
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;

            bookSave(req, res);
        }).patch(function (req, res) {
            //patch = update
            if (req.body._id) {
                delete req.body._id;
            }
            for (var p in req.body) {
                req.book[p] = req.body[p];
            }

            bookSave(req, res);
        })
        .delete(function (req, res) {
            req.book.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send("Removed");
                }
            });
        });

    function bookSave(req, res) {
        req.book.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(req.book);
            }
        });
    }

    return bookRouter;
}

//permite o acesso via require
module.exports = routes;