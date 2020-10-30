const express = require('express');
const server = express();
const postRouter = require('./router/postRouter.js');

server.use(express.json());
server.use('/api/posts', postRouter)


server.get('/', (req, res) => {
    res.send(`
        <h2>Super Cool API</h2>
        <p>Welcome to the super cool API, have fun!</p>
    `)
});


module.exports = server;