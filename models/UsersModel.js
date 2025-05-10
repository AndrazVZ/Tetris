var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    profilePicture: { type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }, 
}, { collection: 'Users' });


const User = mongoose.model("Users", UsersSchema);
module.exports = User;
