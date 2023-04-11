const categoryService = require('./Service');

const getAllCategory = async() =>{
    try {
        return await categoryService.getAllCategory();
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {getAllCategory};