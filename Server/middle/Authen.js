const jwt = require("jsonwebtoken");

const checkTokenWeb = (req, res, next) => {
  const { session } = req;
  const url = req.originalUrl.toLowerCase();

  if (!session) {
    if (url.includes("/login")) {
      next();
    } else {
      return res.redirect("/login");
    }
  } else {
    const { token } = session;
    if (!token) {
      if (url.includes("/login")) {
        next();
      } else {
        return res.redirect("/login");
      }
    }else{
        jwt.verify(token, 'secret', (err,decided) => {
            if(err){
              // token het han
              if (url.includes("/login")) {
                next();
              } else {
                return res.redirect("/login");
              }
            }
            else{
              if (url.includes("/login")) {
                return res.redirect("/");
              } else {
               return next();
              }
            }
        });
    }
  }
};
const checkTokenApp = (req, res,next) => {
  let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer')
        token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, 'secret', function (error, decoded) {
            if (error) {
                return res.status(401).json({ status: false })
            } else {
                req.user = decoded;
                console.log(req.user);
                return next();
            }
        })
    } else {
        return res.status(401).json({ status: false })
    }
};
module.exports = { checkTokenWeb,checkTokenApp };
