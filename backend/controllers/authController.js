const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

function generateToken(user){
    const payload = {id: user._id, username: user.username}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600})
    return token
}

async function register(req, res){
    try{
        const foundUser = await User.findOne({username: req.body.username})

        if(foundUser){
            return res.status(400).json({error: 'User already exists'})
        }

        const encryptedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS))

        const newUser = await User.create({...req.body, password: encryptedPassword})

        const token = generateToken(newUser)

        res.status(200).json({token})
    }catch(error){
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

async function login(req, res){
    try{
        const foundUser = await User.findOne({username: req.body.username})
        if(!foundUser){
            return res.status(404).json({error: 'No such user exists'})
        }

        const validPass = await bcrypt.compare(req.body.password, foundUser.password)

        if(!validPass){
            return res.status(400).json({error: 'Invalid credentials'})
        }

        const token = generateToken(foundUser)

        res.status(200).json({token})
    }catch(error){
        console.error(error); // Log the error for debugging
        res.status(500).json({error: 'Server error'})
    }
}

module.exports = {
    register,
    login
}