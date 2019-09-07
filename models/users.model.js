const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false}
});

module.exports = mongoose.model('Users', userSchema);
