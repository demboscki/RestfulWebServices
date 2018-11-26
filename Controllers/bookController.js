//permitindo que a model Book seja passada por parametro, permite que a controller seja mocada.

var bookController = function (Book) {
    var post = function (req, res) {
        //post = insert
        var book = new Book(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send("Title is required!");
        } else {
            book.save();
            res.status(201);
            res.send(book);
        }
    }

    var get = function (req, res) {
        //get = select
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        } else if (req.query.author) {
            query.author = req.query.author;
        }
        Book.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                var returnBooks = new Array();
                books.forEach(function (element, index, array) {
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = "http://" + req.headers.host + "/api/books/" + newBook._id
                    returnBooks.push(newBook);
                });
                res.json(returnBooks);
            }
        });
    }

    return {
        post: post
        , get: get
    };
}

//permite o acesso via require
module.exports = bookController;