const Post = require('../models/Post');

exports.createNewPost = async (req, res, next) => {
    // res.send("yooo");
    let { 
        user_id,
        title,
        story_category } = req.body;
    try {
        let post = new Post(user_id,
            title,
            story_category
        );
        post = await post.save();
        console.log(post);
        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
}
