const jwt = require('jsonwebtoken');

const UserMiddleWare = (res,req,next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({error:"Access denied "});

    try {
        const verified = jwt.verify(token,process.env.jwt_secret);
        req.user = verified;
        next();
    } catch (error) {
        res.send(400).json({error:'Invalid Token'});
    }
};