import path from 'path'
import express from 'express'
import proxy from 'express-http-proxy'
import dotenv from 'dotenv'
import multer from 'multer'

const SERVER_PORT = 8080
dotenv.config()
const multerConf = {
    dest: process.env.LOCAL_UPLOAD_DEST,
}

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
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('home'))

app.use('/images', proxyBaseImageUrl)
app.listen(SERVER_PORT, () => {
    console.log(`Server (local port): http://localhost:${SERVER_PORT}`)
})
