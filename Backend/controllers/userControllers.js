const User = require('../models/User');


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


// exports.getPostById = async(req,res,next)=>{

//     res.send("Get Post By ID Route");
// }