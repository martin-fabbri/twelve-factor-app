import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/foo'

MongoClient.connect(mongoUri, (err, db) => {
    if (err) {
        console.log('cannot connect to MongoDB', db)
    } else {
        console.log('Connected to MongoDB!')
    }
})

console.log('Server: http://localhost:4000')
