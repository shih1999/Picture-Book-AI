// controllers/detail.js
const { Detail } = require('../models');

exports.getDetailsByPostId = async (req, res) => {
  const { post_id } = req.params;
  try {
    const details = await Detail.findAll({ where: { post_id } });
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving details', error });
  }
};

// 以post_id和page_number讀取特定繪本內容 
exports.getDetailByPostAndPage = async (req, res) => {
  const { post_id, page_number } = req.params;
  try {
    const detail = await Detail.findOne({ where: { post_id: post_id, page_number: page_number } });
    if (detail) {
      res.json(detail);
    } else {
      res.status(404).json({ message: 'Detail not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving detail', error });
  }
};

exports.updateDetailPublishedStatus = async (req, res) => {
  const { page_id } = req.params;
  const { published } = req.body;
  
  try {
    const detail = await Detail.findByPk(page_id);
    if (!detail) {
      return res.status(404).json({ message: 'Detail not found' });
    }
    
    detail.published = published;
    await detail.save();

    res.json({ message: 'Detail published status updated successfully', detail });
  } catch (error) {
    console.error('Error updating detail published status:', error);
    res.status(500).json({ message: 'Error updating detail published status' });
  }
};


