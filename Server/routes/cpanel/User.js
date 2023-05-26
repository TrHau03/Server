var express = require("express");
var router = express.Router();
const userController = require("../../components/user/Controller");

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
router.post("/", async (req, res, next) => {

    try {
      const { email, password, name } = req.body;
        console.log(email);
      const result = await userController.register(email, password, name);
      if (result) {
        res.redirect("/login");
      } else {
        res.redirect("/register");
      }
    } catch (error) {
      return res.redirect("/register");
    }
  });
module.exports = router;