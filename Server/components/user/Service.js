//check email, password trong database
// có return user, không return null
const userModel = require('./Model');
const userModelApp = require('./ModelApp');
const bcrypt = require('bcryptjs');
const getAllUser = async () => {
    try {
        return await userModel.find();
    } catch (error) {
        console.log("GetAllUserErr", error);
    }
}
const deleteUsersByID = async (id) => {
    try {
        await userModel.findByIdAndDelete(id);
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}
const login = async (email, password) => {
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            const checklogIn = bcrypt.compareSync(password, user.password);
            return checklogIn ? user : false;
        }
        return null;
    } catch (error) {
        console.log("UserService Error: ", error);
    }
    return false;
}
const loginApp = async (email, password) => {
    try {
        const user = await userModelApp.findOne({ email });
        if (user) {
            const checklogIn = bcrypt.compareSync(password, user.password);
            return checklogIn ? user : false;
        }
        return null;
    } catch (error) {
        console.log("UserService Error: ", error);
    }
    return false;
}
const register = async (email, name, password) => {
    try {
        //find() => array findOne => object{}
        var date_time = new Date();
        let date = ("0" + date_time.getDate()).slice(-2);

        // get current month
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();
        let now = year + "-" + month + "-" + date;
        let user = await userModel.findOne({ email });
        console.log(user, email, password, name);
        if (user) {
            console.log("Email da duoc dang ki");
            return false;
        }
        //mã hóa password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        user = new userModel({ email, password: hash, name, now });
        console.log("Register", now);
        await user.save();
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}
const registerApp = async (email, name, password) => {
    try {
        //find() => array findOne => object{}
        var date_time = new Date();
        let date = ("0" + date_time.getDate()).slice(-2);

        // get current month
        let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

        // get current year
        let year = date_time.getFullYear();
        let now = year + "-" + month + "-" + date;
        let user = await userModelApp.findOne({ email });
        console.log(user, email, password, name);
        if (user) {
            console.log("Email da duoc dang ki");
            return false;
        }
        //mã hóa password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        user = new userModelApp({ email, password: hash, name, now });
        console.log("Register", now);
        await user.save();
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}
module.exports = { login,loginApp, register,registerApp, getAllUser, deleteUsersByID };
