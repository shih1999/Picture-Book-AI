const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createNewUser = async (req, res, next) => {
    let { email_address, user_name, user_password } = req.body;
    try {
        let user = new User(email_address, user_name, user_password);
        user = await user.save();
        console.log(user);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

exports.checkUser = async (req, res, next) => {
    let { user_name, user_password } = req.body; 
    try {
        let [rows] = await User.findByName(user_name);
        let user = rows[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // 验证密码
        // const isMatch = await bcrypt.compare(user_password, user.user_password);
        if (user_password==user.user_password) {
            res.status(200).json({ message: 'User validated successfully', user });
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking user', error });
    }
}

// exports.getPostById = async(req,res,next)=>{

//     res.send("Get Post By ID Route");
// }