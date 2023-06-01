const productModel = require('./Model');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
//getAll Products
const getALLProducts = async () => {
     try {
    //return data;
    return await productModel.find({}).populate('category', 'name') ;
} catch (error) {
    console.log(error);
}}
//delete products with id
const deleteProductsByID = async (id) => {
    try {
        await productModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

const addProduct = async(title, author,content,image,imageContent1,imageContent2,imageContent3,category) => {
  try {
    // const newProduct = {
    //   _id: data.length + 1,
    //   name, price, quantity, iamge, category
    // };
    // data.push(newProduct);
    const newProduct = new productModel({title, author, content, image,imageContent1,imageContent2,imageContent3, category});
    await newProduct.save();
    return true;
  } catch (error) {
    console.log("Add err:" ,error)
    return false;
  }
}
const getProductByID = async(id) => {
  try {
    // console.log("ID:", id)
    // const product = data.find(item => item._id.toString() == id.toString());
    const product = await productModel.findById(id).populate('category', 'name');
    console.log("Product:", product);
    return product;
  } catch (error) {
    console.log("Get Product by id err:" ,error);
  }
  return null;
}
const getProductByCate = async(_id) => {
  try {
    // console.log("ID:", id)
    // const product = data.find(item => item._id.toString() == id.toString());
    const productgetall = await productModel.find({}).populate('category', 'name') ;
    const product = productgetall.filter(item => {
      if(item.category._id.toString() == _id.toString()){
        return item;
      }
    })
    console.log("Product:", product);
    return product;
  } catch (error) {
    console.log("Get Product by id err:" ,error);
  }
  return null;
}
const updateProductByID = async(id,title,author,content,image,category) => {
  try {
    // const product = data.find(item => item._id.toString() == id.toString());
    const product = await productModel.findById(id);
    if(product){
      // data = data.map(item =>{
      //   if(item._id.toString() == id.toString()){
      //     item.name = name ? name : item.name;
      //     item.price = price ? price : item.price;
      //     item.quantity = quantity ? quantity : item.quantity;
      //     item.iamge = iamge ? iamge : item.iamge;
      //     item.category = category ? category : item.category;
      //   }
      //   return item;
      // });
      product.title = title? title : product.title;
      product.author = author ? author : product.author;
      product.content = content ? content : product.content;
      product.image = image ? image : product.image;
      product.category = category ? category : product.category;
      await product.save();
    return true;
    }
  } catch (error) {
    console.log("Update Product by id err:" ,error);
  }
  return false;

}
const searchProduct = async(key) => {
  try {
    let query = {
      title:{$regex: key, $options: 'i'}, 
    };
    let product = await productModel.find(query);
    return product;
  } catch (error) {
    console.log("Search Product Error: " , error);
  }
  return [];
}
module.exports = {getALLProducts,deleteProductsByID,addProduct,getProductByID,updateProductByID,searchProduct,getProductByCate};

