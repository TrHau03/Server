const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    //_id: { type: ObjectId }, // khóa chính
    name: { 
        type: String,
     },
    email: { type: String,unique: true, required: true},
    password: { type: String, required: true},
    now: {type: String},
});

module.exports = mongoose.models.userApp || mongoose.model('userapp', userSchema);
// category -----> categories