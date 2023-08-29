require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

const PORT = 3000

const connectDB = require('./config')

connectDB()

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const apiRoutes = require('./routes/apiRoutes')

const { authorize } = require('./middleware/authMiddleware')

app.use(express.json())
app.use(cors())

app.use('/', (req,res) => { res.send('Hello World')})
app.use('/users', authorize ,userRoutes)
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})