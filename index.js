const express = require('express');

const commentRouter = require('./comments/comment-router')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda comment API</h>
    <p>Welcome to the Lambda comment API</p>
  `);
});

server.use('/api/posts', commentRouter)



server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
