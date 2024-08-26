const jwtKey = "pentkart"
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    console.log("token without split = ", token)
    if (token) {
        // token = token.split(" ")[1];
        console.log("ui side coming token = ", token)
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                console.log("error : ", err)
                res.send({ "message": "invalid token" })
            }
            else
                next()
        })
    }
    else {
        res.send({ "message": "please provide token" })
    }
}

module.exports = verifyToken;