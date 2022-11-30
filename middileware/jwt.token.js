const jwt = require('jsonwebtoken'); //


checkToken = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token, "jwtKey", (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: "Invalid Token!",
          });
        } else {
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access denied!Unauthorized User",
      });
    }
  },


module.exports = checkToken;