//should é uma forma explicativa de fazer assertions.
var should = require("should"),
    sinon = require("sinon");

//describe é parte do Mocha, onde torna o teste mais intuitivo e self docummented
describe("Book Controller Tests:", function () {
    describe("Post", function () {
        it("should not allow an empty title on post", function () {
            var Book = function (book) { this.save = function () { } };
            var req = {
                body: {
                    author: "Bruno"
                }
            };
            var res = {
                status: sinon.spy()
                , send: sinon.spy()
            }

            //chama a api passando um objeto fake
            var bookController = require("../Controllers/bookController")(Book);
            bookController.post(req, res);

            //calledWith é o retorno exato vindo da controller´
            //post irá preencher o res.status e res.send, com os valored dentro de calledWith.
            res.status.calledWith(400).should.equal(true, "Bad Status " + res.status.args[0][0]);
            res.send.calledWith("Title is required!").should.equal(true);

        });
    });
});