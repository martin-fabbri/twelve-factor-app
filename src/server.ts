import path from 'path'
import express from 'express'
import proxy from 'express-http-proxy'
import dotenv from 'dotenv'
import multer from 'multer'
import { v4 } from 'uuid'

const SERVER_PORT = 8080
dotenv.config()
const serverName = process.env.SERVER_NAME || 'default'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.LOCAL_UPLOAD_DEST || 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${v4()}-${file.originalname}`)
    },
})
const upload = multer({
    storage,
})

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('home'))
app.post('/upload', upload.single('img'), (req, res) => {
    console.log(req.body, req.file)
    res.send('ok')
})

app.use('/images', proxyBaseImageUrl)
app.listen(SERVER_PORT, () => {
    console.log(`Server (${serverName}): http://localhost:${SERVER_PORT}`)
})
