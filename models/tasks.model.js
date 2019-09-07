const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskScehma = new Schema({
    name: {type: String, require: true},
    description: {type: String,},
    createdAt: {type: Date, default: Date.now},
    deadLine: {type: Date, require: true},
    status: {type: String, default: 'Pending'},
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Tasks', taskScehma);
