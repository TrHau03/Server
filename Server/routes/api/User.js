var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const {checkRegister} = require('../../middle/Validation');
// /api/user 
const userController = require('../../components/user/Controller');



//dang ki
router.post('/register', [checkRegister],async(req, res, next) => {
    try {
        const {email,name, password } = req.body;
        console.log(email,name,password);
        const user = await userController.registerApp(email,name, password);
        if(user){
            return res.status(200).json({result:true, user});
        }
        return res.status(400).json({result:false});
    } catch (error) {
        console.log(error);
        return res.status(504).json({result: false});
    }
});
router.post('/login', async(req, res, next) => {
    try {
        const {email, password} = req.body;
        console.log(email, password);
        const user = await userController.loginApp(email, password);
        if(user){
            const token = jwt.sign({_id: user._id }, "secret", {
                expiresIn: 1*60 * 60
              });
            return res.status(200).json({result:true, user,token: token});
        }
        return res.status(400).json({result:false});
    } catch (error) {
        console.log(error);
        return res.status(504).json({result: false});
    }
});
module.exports = router;