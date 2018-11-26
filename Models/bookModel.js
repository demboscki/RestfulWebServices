//mongoose: injeta métodos de acesso ao mongo, como save, find, findById e remove.
var mongoose = require("mongoose")
    , Schema = mongoose.Schema;

var bookModel = new Schema({
    title: { type: String }
    , author: { type: String }
    , genre: { type: String }
    , read: { type: Boolean, default: false }
    , rating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Book", bookModel);