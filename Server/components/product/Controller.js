const productService = require('./Service');

const getALLProducts = async () => {
    try {
        return await productService.getALLProducts();
    } catch (error) {
        console.log(error);
    }
}
const deleteProductsByID = async (id) => {
    try {
        return await productService.deleteProductsByID(id);
    } catch (error) {
        
    }
}
const addProduct = async (title,author,content,image,imageContent1,imageContent2,imageContent3,category) => {
    try {
        return await productService.addProduct(title,author,content,image,imageContent1,imageContent2,imageContent3,category);
    } catch (error) {
        console.log(error);
    }
}
const getProductByID = async (id) => {
    try {
        return await productService.getProductByID(id);
    } catch (error) {
        console.log(error);
    }
}
const getProductByCate = async (_id) => {
    try {
        return await productService.getProductByCate(_id);
    } catch (error) {
        console.log(error);
    }
}
const updateProductByID = async (id,title,author,content,image,category) => {
    try {
        return await productService.updateProductByID(id,title,author,content,image,category);
    } catch (error) {
        console.log(error);
    }
}
const searchProduct = async(key) =>{
    try {
        return await productService.searchProduct(key);
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getALLProducts,deleteProductsByID,addProduct,getProductByID,updateProductByID,searchProduct,getProductByCate};