import path from 'path'
import express from 'express'
import proxy from 'express-http-proxy'
import dotenv from 'dotenv'

const SERVER_PORT = 8080

dotenv.config()

const baseImgUrl = process.env.BASE_IMAGE_URL
const proxyBaseImageUrl = baseImgUrl
    ? proxy(baseImgUrl, {
          proxyReqPathResolver: req => {
              const newPath = baseImgUrl + req.path
              console.log(newPath)
              return newPath
          },
      })
    : express.static(path.join(__dirname, 'public/images'))

const app = express()

app.use('/images', proxyBaseImageUrl)
app.listen(SERVER_PORT)

console.log(`Server: http://localhost:${SERVER_PORT}`)
