const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  //_id: { type: ObjectId }, // khóa chính
  name: {
    type: String,
  },
  price:{ type: Number,},
  quantity: { type: Number,},
  iamge: { type: String,},
  category: {type: ObjectId,ref: 'category'},
});

module.exports =
  mongoose.models.product || mongoose.model("product", schema);
// category -----> categories
