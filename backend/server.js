require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const PORT = 8080

const connectDB = require('./config')

connectDB()

const { authorize } = require('./middlemare/authMiddleware')

app.use(express.json())
app.use(cors)

app.use('/', (req,res) => { res.send('Hello World')})

app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})