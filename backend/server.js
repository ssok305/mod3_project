require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const PORT = 8080

const connectDB = require('./config')

connectDB()

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/apiRoutes')
const baseURL = require('./routes/baseURL')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())



app.use(baseURL + '/api/users', authorize ,userRoutes)
app.use(baseURL + '/api/music', apiRoutes)
app.use(baseURL + '/auth', authRoutes)


app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})