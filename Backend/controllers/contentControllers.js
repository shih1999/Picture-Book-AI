const Content = require('../models/Content');

exports.createNewContent = async (req, res, next) => {
    let { 
        post_id,
        article,
        page_number,
        image_url,
        content,
        published
        } = req.body;
    try {
        let contents = new Content(
            post_id,
            article,
            page_number,
            image_url,
            content,
            published
        );
        contents = await contents.save();
        console.log(contents);
        res.status(201).json({ message: "Content created successfully", contents });
    } catch (error) {
        res.status(500).json({ message: 'Error creating content', error });
    }
}
