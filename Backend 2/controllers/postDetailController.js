const { Post, Detail } = require('../models');
const { v4: uuidv4 } = require('uuid');


exports.createPostAndDetail = async (req, res) => {
  const { user_id, post_content, story_category, detail_article, page_number, image_url, detail_content, published } = req.body;
  const created_at = new Date(); 
  try {
    const post = await Post.create({
      user_id,
      content: post_content,
      created_at,
      likes_count: 0,
      comments: [""],
      comments_count: 0,
      story_category
    });

    const detail = await Detail.create({
      post_id: post.post_id, 
      article: detail_article,
      page_number,
      image_url,
      content: detail_content,
      published
    });

    res.status(201).json({ message: 'Post and Detail created', post, detail });
  } catch (error) {
    res.status(400).json({ message: 'Error creating post and detail', error });
  }
};
