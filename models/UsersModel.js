var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
}, { collection: 'Users' });

const User = mongoose.model("Users", UsersSchema);
module.exports = User;
