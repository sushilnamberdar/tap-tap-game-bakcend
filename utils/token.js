const jwt = require('jsonwebtoken');

const  generateToken = (payload)=> {
    const secret = process.env.jwt_secret;
    const expiration = process.env.JWT_EXPIRATION;

    return jwt.sign(payload,secret, {expiresIn:expiration});

}

module.exports = generateToken;