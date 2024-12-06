const express = require('express');
const { Register, login } = require('../Controllers/UserController');



const router = express.Router();

// Routes

router.post('/register',Register);
router.post('/login',login);


module.exports = router;
