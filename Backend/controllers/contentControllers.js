const Content = require('../models/Content');

exports.createNewContent = async (req, res, next) => {
    let { 
        post_id,
        page_number,
        image_url,
        content
        } = req.body;
    try {
        let contents = new Content(
            post_id,
            page_number,
            image_url,
            content
        );
        contents = await contents.save();
        console.log(contents);
        res.status(201).json({ message: "Content created successfully", contents });
    } catch (error) {
        res.status(500).json({ message: 'Error creating content', error });
    }
}

exports.contentModify = async (req, res, next) => {
    try {
        const pageId = req.params.page_id; 
        const updateData = req.body; 
        const affectedRows = await Content.updateContent(pageId, updateData);
        
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Content modified successfully.' });
        } else {
            res.status(404).json({ message: 'Content not found.' });
        }
    } catch (error) {
        next(error); 
    }
};

exports.getPostAllPage = async (req, res, next) => {
    try {
        const postId = req.params.post_id; 
        const postPages = await Content.findByPostId(postId);
        
        if (postPages.length > 0) {
            res.status(200).json({ message: 'User posts retrieved successfully.', postPages });
        } else {
            res.status(404).json({ message: 'No posts found for this user.' });
        }
    } catch (error) {
        next(error); 
    }
};

exports.findFirstPageWithImage = async (req, res, next) => {
    try {
        const postId = req.params.post_id;
        const postPage = await Content.findcover(postId);

        if (postPage) {
            res.status(200).json({ message: 'Post cover retrieved successfully.', postPage });
        } else {
            res.status(404).json({ message: 'No post cover found for this post_id with a non-null image URL.' });
        }
    } catch (error) {
        next(error);
    }
};