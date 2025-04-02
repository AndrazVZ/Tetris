var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TetrisSchema = new Schema({
});

module.exports = mongoose.model('Tetris', TetrisSchema);
