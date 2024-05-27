const User = require('../models/User');


exports.createNewUser = async(req,res,next)=>{
    let {email_address, user_name, user_password} = req.body;

    let user = new User(email_address, user_name, user_password);

    user = await user.save();
    console.log(user);

    res.send("Create New user");
}

// exports.getPostById = async(req,res,next)=>{

//     res.send("Get Post By ID Route");
// }