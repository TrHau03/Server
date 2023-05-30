var express = require("express");
var router = express.Router();
const userController = require("../../components/user/Controller");
const { checkTokenWeb } = require("../../middle/Authen");
router.get('/', async (req, res, next) => {
    try {
      
        const user = await userController.getAllUser();
        console.log(user);
        return res.render('users/list',{user})
    } catch (error) {
        console.log("UserErr", error);
    }
});
router.get('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await userController.deleteUsersByID(id);
        return res.json({ result });
    } catch (error) {
        return res.json({ result: false });
    }
});
router.post('/', [checkTokenWeb], async (req, res, next) => {
  try {
    const { email, password, name, passAgain } = req.body;
    console.log(email, "Email");
    if (password != passAgain) {
      res.redirect("/cpanel/user");
    } else {
      const result = await userController.register(email, password, name);
      if (result) {
        res.redirect("/cpanel/user");
      }
    }

  } catch (error) {
    next(error);
  }
});
module.exports = router;