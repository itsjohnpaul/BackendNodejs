const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {

    const filePath = path.join(__dirname, "docs","sample.html")

    fs.readFile(filePath, "utf-8", (err, data) => {

        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" })
            res.end("File not found")
        } else {
            res.writeHead(200, { "Content-Type": "text/html" })
            res.end(data)
        }

    })

})

server.listen(3000, () => {
    console.log("server running on port 3000")
})