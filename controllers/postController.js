const { Post } = require('../models');
const { Detail } = require('../models');

// 按讚
exports.likePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes_count += 1;
    await post.save();
    res.json({ message: 'Post liked successfully', likes_count: post.likes_count });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Error liking post' });
  }
};

// 新留言
exports.addComment = async (req, res) => {
  const postId = req.params.postId;
  const { comment } = req.body;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.push(comment);
    post.comments_count += 1;
    // save資料存進資料庫
    await post.save();
    res.json({ message: 'Comment added successfully', comments_count: post.comments_count });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
};

// 獲取特定使用者的所有post
exports.getPostsByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
      const posts = await Post.findAll({ where: { user_id: userId } });
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts by user ID:', error);
      res.status(500).json({ message: 'Error fetching posts by user ID' });
    }
};

// 獲取特定種類的post
exports.getPostsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await Post.findAll({ where: { story_category: category } });
    if (posts.length > 0) {
      res.json(posts);
    } else {
      res.status(404).json({ message: 'No posts found for this category' });
    }
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
};
