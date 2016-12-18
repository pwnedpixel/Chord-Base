var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SongSchema   = new Schema({
    title: String,
    author: String,
    body: String,
    createDate: String,
    public: String
});

module.exports = mongoose.model('Song', SongSchema);
