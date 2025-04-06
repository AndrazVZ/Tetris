var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const UsersSchema = new Schema({
	name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, { collection: 'Users' });

const User = mongoose.model("Users", UsersSchema);
module.exports = User;

