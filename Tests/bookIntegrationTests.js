//mocha: cria o suite "describe" e método de teste "it"
//should: injeta o should no objeto e deixa o teste mais legivel
//supertest: deixa um listener ligado para o teste.
var should = require("should")
    , request = require("supertest")
    , app = require("../app.js")
    , mongoose = require("mongoose")
    , Book = mongoose.model("Book")
    , agent = request.agent(app);

describe("Book CRUD Test", function () {
    it("Should allow a book to be posted and return a read an _id", function (done) {
        var bookPost = { title: "New Book", author: "Bruno", genre: "Fiction" }

        agent.post("/api/books")
            .send(bookPost)
            .expect(200)
            .end(function (err, results) {
                results.body.read.should.equal(false);
                results.body.should.have.property("_id");
                done();
            });
    });
    this.afterEach(function (done) {
        //Book.remove().exec();
        //Book.deleteOne().exec();
        Book.deleteMany().exec();
        
        done();
    });
});