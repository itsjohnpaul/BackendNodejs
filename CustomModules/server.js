const http = require('http')
const path = require('path')
const fs = require('fs')
const calculator = require('./modules')


const server = http.createServer((req, res) => {


    res.writeHead(200, { "Content-Type": "text/plain" });
    let a = 4;
    let b = 5;

    res.write(`Addition : ${calculator.add(a, b)}`)
    res.write("\n")
    res.write(`Subraction : ${calculator.sub(a, b)}`)
    res.write("\n")

    res.write(`Square : ${calculator.square(a)}`)
    res.write("\n")
    res.write(`Multiplication : ${calculator.mul(a, b)}`)
    res.end()


})

server.listen(3000, () => {
    console.log("server running on port 3000")
})