//check email, password trong database
// có return user, không return null
const userModel = require('./Model');
const bcrypt = require('bcryptjs');
    const login = async(email, password) => {
        try {
           const user = await userModel.findOne({email});
           if(user){
            const checklogIn = bcrypt.compareSync(password, user.password);
            return checklogIn ? user : false;
           }
            return null;
        } catch (error) {
            console.log("UserService Error: ", error);
        }
        return false;
    }
    const register = async(email,name, password) => {
        try {
            //find() => array findOne => object{}
            let user = await userModel.findOne({email});
            console.log(user,email,password,name);
            if(user){
                console.log("Email da duoc dang ki");
                return false;
            }
            //mã hóa password
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
              user = new userModel({email, password : hash, name});
              console.log("Register",user);
            await user.save();
            return true;
        } catch (error) {
            console.log(error);
        }
        return false;
    }
module.exports = {login,register};
