const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);
require('dotenv').config();

exports.signIn = async (req, res) => {
    const requestBody = req.body;

    try {

        const user = await User.findOne({email: requestBody.email, isActive: true, isDeleted: false});

        if (user) {
            bcrypt.compare(requestBody.password, user.password, (error, success) => {
                if (success) {
                    const token = jwt.sign({user: user._id}, process.env.SECURE_PASSWORD, {expiresIn: process.env.EXPIRY});
                    res.status(200).json({user, token});
                } else {
                    res.status(401).json({message: 'Invalid Credentials'});
                }
            });
        } else {
            res.status(401).json({message: 'Invalid Credentials'});
        }

    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.signOut = (req, res) => {
    const token = req.headers['access-token'];
    try {
        jwtBlacklist.blacklist(token);
        res.status(200).json({message: 'User is logged-out'});
    } catch (error) {
        res.status(500).json({message: error})
    }
}
