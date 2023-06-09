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
    phone:{type: Number, default: 0}
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
// category -----> categories