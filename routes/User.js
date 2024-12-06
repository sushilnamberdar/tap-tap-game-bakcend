const express = require('express');
const { Register, login } = require('../Controllers/UserController');



const router = express.Router();

// Routes

router.post('/register',Register);
router.post('/login',login);
router.get('/', ((req,res)=> {
    res.send('HII this side sushil namberdar')

}))


module.exports = router;
