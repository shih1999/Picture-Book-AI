const Post = require('../models/Post');

exports.createNewPost = async (req, res, next) => {
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

//delete post 確定detail也會被刪掉 ok
exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.post_id; // 從請求參數中獲取 post_id
        const affectedRows = await Post.deleteByPostId(postId);
        
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Post deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Post not found.' });
        }
    } catch (error) {
        next(error); // 將錯誤傳遞給下一個中間件（如錯誤處理器）
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const postId = req.params.post_id;
        const posts = await Post.findByPostId(postId);

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const post = posts[0];
        const newLikesCount = post.likes_count + 1;

        const result = await Post.updateLikesCount(postId, newLikesCount);

        if (result > 0) {
            res.status(200).json({ message: 'Post liked successfully.', likes_count: newLikesCount });
        } else {
            res.status(500).json({ message: 'Failed to update post.' });
        }
    } catch (error) {
        next(error); 
    }
};

exports.getAllUserPost = async (req, res, next) => {
    try {
        const userId = req.params.user_id; 
        const userPosts = await Post.findByUserId(userId);
        
        if (userPosts.length > 0) {
            res.status(200).json({ message: 'User posts retrieved successfully.', userPosts });
        } else {
            res.status(404).json({ message: 'No posts found for this user.' });
        }
    } catch (error) {
        next(error); 
    }
};

exports.modifyPost = async (req, res, next) => {
    try {
        const postId = req.params.post_id; 
        const updateData = req.body; 
        const affectedRows = await Post.updatePost(postId, updateData);
        
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Post modified successfully.' });
        } else {
            res.status(404).json({ message: 'Post not found.' });
        }
    } catch (error) {
        next(error); 
    }
};