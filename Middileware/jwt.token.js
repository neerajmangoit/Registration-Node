const jwt = require('jsonwebtoken'); //
const jwtKey = "protect";

function varifyToken(req, resp, next) {
    const token = req.headers['authorization'];
    // console.log(token);
    if(token) {
        jwt.verify(token, jwtKey, (err, valid)=> {
            if(err) {
                resp.send("Please provide valid token");
            } else {
                next();
            }
        });
    } else {
        resp.send("Please provide token");
    }
}

module.exports = varifyToken;