const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/token');


const salt_rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

const Register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

            const existingemail = await User.findOne({email});
            if(existingemail) {
                return res.status(400).json({message:'Email Already in Use '});
            }

            const existingusername = await User.findOne({username});
            if(existingusername){
                return res.status(400).json({message:'Username Already in Use'})
            }

        const hashedPassword = await bcrypt.hash(password, salt_rounds);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            activity: {
                lastlogin: Date.now(),
                lastlogindevice: 'N/A',
                loginHistory: []
            }
        })

        await newUser.save();

        return res.status(201).json({ message: 'User Register successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error registering user', error });
    }
}

const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message:'User Not Found'});
        }
        const isMach = await bcrypt.compare(password,user.password);
        if(!isMach){
            return res.status(401).json({message:'invalid email or password '});
        }

        // update the login info if the password and email math 
        user.activity.lastlogin = Date.now();
        user.activity.lastlogindevice = req.headers['user-agent'];
        user.activity.loginHistory.push({
            logintime:Date.now(),
            ipAddress:req.ip,
            deviceDetails:req.headers['user-agent']
        })

        await user.save();
        const token = generateToken({id:user._id,username:user.username,email:user.email});

      await  res.cookie('userauthToken', token, {
            path:'/',
            maxAge: 3600000, // 1 hour in milliseconds
            httpOnly: false,
            secure:false,
            sameSite:'lax'
        });
        return res.status(200).json({
            message:'Login Successful',
            token,
            user:{username:user.username,email:user.email}
        });
    }catch (error){
        console.error(error);
        return res.status(500).json({message:'Error Loggin in ',error});
    }
}

module.exports = {Register,login};