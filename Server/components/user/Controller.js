const userService = require('./Service');

const login  = async(email, password) =>{
    try {
        return await userService.login(email, password);
    } catch (error) {
        console.log("User Controller error:",error) ;
    }
    return false;
}
const register = async(email,name, password) => {
    try {
        return await userService.register(email,name,password);
    } catch (error) {
        console.log("User Controller error:",error) ;
    }
    return false;
}
 module.exports = {login,register};