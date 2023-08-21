// var http = require('http');
// const express = require('express');
// const next = require('next');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();


const http = require('http');
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen();
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    });

