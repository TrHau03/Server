var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
/* GET home page. */

//localhost:3000/
// router.post('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// //localhost:3000/query?name=Hau&age=19
// router.get('/query', function(req, res, next) {
//   const {name, age} = req.query;
//   //query is lấy data từ url
//   res.render('index', { name,age});
// });
// //
// router.get('/tinh/:a/:b/:c', function(req, res, next) {
//   const {a,b,c} = req.params;
//   const sum = Number(a) + Number(b) + Number(c);
//   //params is lấy data từ url
//   res.render('index', {sum});
// });
// //localhost:3000/tinh
// router.post('/tinh', function(req, res, next) {
//   const {a,b,c} = req.body;
//   const sum = Number(a) + Number(b) + Number(c);
//   //body is lấy data từ form
//   res.json({sum});
// });
const userController = require("../components/user/Controller");
const { checkTokenWeb } = require("../middle/Authen");
//hiển thị trang login
router.get("/login", [checkTokenWeb], function (req, res, next) {
  
  res.render("../views/users/login.hbs");
});
//xử lí login
// check email,pass từ form
// thành công => trang chủ
// thất bại => login
router.post("/login", async (req, res, next) => {
  try {
    const check = await userController.register('admin@admin.pm', 'Hau', 'admin');
    //await userController.register(email = "admin@pm.admin.com", password = "admin", name = "Hau");
    const { email, password } = req.body;
    const result = await userController.login(email, password);
    if (result) {
      //tạo token
      const token = jwt.sign({ id: 1, name: "abc" }, "secret", {
        expiresIn: 1 * 60 * 60
      });
      console.log("token: " + token);
      //lưu vào session
      req.session.token = token;
      return res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log("Errr login", error);
    return res.redirect("/login");
  }
});
//logout
router.get("/logout", [checkTokenWeb], async (req, res, next) => {
  try {
    req.session.destroy();
    return res.render("../views/users/login.hbs");
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/register", function (req, res, next) {
  res.render("../views/users/register.hbs");
});
//xử lí login
// check email,pass từ form
// thành công => trang chủ
// thất bại => login

router.get("/", [checkTokenWeb], function (req, res, next) {
  res.render("index");
});

module.exports = router;
// res response: trả về từ server client
//res.render:  Render ra file html(dạng web)
//res.json:  Trả về dữ liệu dạng json(API)
//res.send: Trả về dữ liệu dạng text(API)
//res.redirect : chuyển hướng trang
//res.download: tải file về
//next: function next
