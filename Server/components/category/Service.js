const categoryModel = require('./Model');

const getAllCategory = async () =>{
    try {
        // return data;
        return await categoryModel.find();
    } catch (error) {
        console.log(error);
    }
}
module.exports = {getAllCategory};

