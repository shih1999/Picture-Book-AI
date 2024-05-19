// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const userRouter = require('./routes/user');
const detailRouter = require('./routes/detail');
const postRouter = require('./routes/post');
const postDetailRouter = require('./routes/postDetail');

const app = express();

app.use(bodyParser.json());

// 使用用户路由
app.use('/user', userRouter);
app.use('/detail', detailRouter);
app.use('/post', postRouter);
app.use('/postDetail', postDetailRouter);

// 启动服务器
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
