const server = require('./server.js')


const port = 5000

server.listen(port, () => {
    console.log(`\n***server running on http://localhost:${port}***\n`)
})