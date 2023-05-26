const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  //_id: { type: ObjectId }, // khóa chính
  title: {
    type: String,
  },
  author:{ type: String,},
  content: { type: String,},
  image: { type: String,},
  imageContent1: { type: String,},
  imageContent2: { type: String,},
  imageContent3: { type: String,},
  category: {type: ObjectId,ref: 'category'},
});

module.exports =
  mongoose.models.product || mongoose.model("product", schema);
// category -----> categories
