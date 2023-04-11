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
const addProduct = async (name,price,quantity,iamge,category) => {
    try {
        return await productService.addProduct(name,price,quantity,iamge,category);
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
const updateProductByID = async (id,name,price,quantity,iamge,category) => {
    try {
        return await productService.updateProductByID(id,name,price,quantity,iamge,category);
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
module.exports = {getALLProducts,deleteProductsByID,addProduct,getProductByID,updateProductByID,searchProduct};