import http from 'http'

const serverName = process.env.SERVER_NAME || 'default'
const port = process.env.PORT || 8000

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(`Hello from server: ${serverName}\n`)
})

server.listen(port)

console.log(`Server running at http://localhost:${port}/`)
