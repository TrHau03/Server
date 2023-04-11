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

var data = [{
    "_id": 1,
    "name": "Blondie"
  }, {
    "_id": 2,
    "name": "Arnie"
  }, {
    "_id": 3,
    "name": "Jeremiah"
  }, {
    "_id": 4,
    "name": "Bibi"
  }, {
    "_id": 5,
    "name": "Elysee"
  }, {
    "_id": 6,
    "name": "Noach"
  }, {
    "_id": 7,
    "name": "Far"
  }, {
    "_id": 8,
    "name": "Packston"
  }, {
    "_id": 9,
    "name": "Sashenka"
  }, {
    "_id": 10,
    "name": "Gladi"
  }]