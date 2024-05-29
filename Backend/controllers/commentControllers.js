const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createNewComment = async (req, res, next) => {
    let { 
        post_id,
        user_id,
        text } = req.body;
    try {
        let comment = new Comment(
            post_id,
            user_id,
            text
        );
        comment = await comment.save();
        console.log(comment);
        res.status(201).json({ message: "Comment created successfully", comment });
        await exports.commentPost(req, res, next);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.comment_id; 
        const affectedRows = await Comment.deleteByPostId(commentId);
        
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Comment deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Comment not found.' });
        }
    } catch (error) {
        next(error); 
    }
};

exports.modifyComment = async (req, res, next) => {
    try {
        const commentId = req.params.comment_id; 
        const commentText = req.body.text;
        const affectedRows = await Comment.updateComments(commentId, commentText);
        
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Comment deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Comment not found.' });
        }
    } catch (error) {
        next(error); 
    }
};

exports.commentPost = async (req, res, next) => {
    try {
        const postId = req.body.post_id;
        const posts = await Post.findByPostId(postId);

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const post = posts[0];
        const newCommentsCount = post.comments_count + 1;

        const result = await Post.updateCommentsCount(postId, newCommentsCount);

        if (result > 0) {
            res.status(200).json({ message: 'Post liked successfully.', comments_count: newCommentsCount });
        } else {
            res.status(500).json({ message: 'Failed to update post.' });
        }
    } catch (error) {
        next(error); // 将错误传递给下一个中间件（如错误处理器）
    }
};


// exports.likePost = async (req, res, next) => {
//     try {
//         const postId = req.params.post_id;
//         const posts = await Post.findByPostId(postId);

//         if (posts.length === 0) {
//             return res.status(404).json({ message: 'Post not found.' });
//         }

//         const post = posts[0];
//         const newLikesCount = post.likes_count + 1;

//         const result = await Post.updateLikesCount(postId, newLikesCount);

//         if (result > 0) {
//             res.status(200).json({ message: 'Post liked successfully.', likes_count: newLikesCount });
//         } else {
//             res.status(500).json({ message: 'Failed to update post.' });
//         }
//     } catch (error) {
//         next(error); // 将错误传递给下一个中间件（如错误处理器）
//     }
// };

// exports.commentPost = async (req, res, next) => {
//     try {
//         const postId = req.params.post_id;
//         const posts = await Post.findByPostId(postId);

//         if (posts.length === 0) {
//             return res.status(404).json({ message: 'Post not found.' });
//         }

//         const post = posts[0];
//         const newCommentsCount = post.comments_count + 1;

//         const result = await Post.updateCommentsCount(postId, newCommentsCount);

//         if (result > 0) {
//             res.status(200).json({ message: 'Post liked successfully.', comments_count: newCommentsCount });
//         } else {
//             res.status(500).json({ message: 'Failed to update post.' });
//         }
//     } catch (error) {
//         next(error); // 将错误传递给下一个中间件（如错误处理器）
//     }
// };