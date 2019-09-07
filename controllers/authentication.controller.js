const User = require('../models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtBlacklist = require('jwt-blacklist')(jwt);

exports.signIn = (req, res) => {
    const requestBody = req.body;

    try {
        User.findOne({ email: requestBody.email, isActive: true, isDeleted: false })
            .exec((error, user) => {
                if (error) {
                    res.status(400).json({ message: error.message });
                    return;
                } else {
                    if (user) {
                        bcrypt.compare(requestBody.password, user.password, (error, success) => {
                            if (success) {
                                const token = jwt.sign({ user: user._id }, 'TM', { expiresIn: process.env.EXPIRY });
                                res.status(200).json({ user, token });
                            } else {
                                res.status(200).json({ message: 'Password did not match' });
                            }
                        });
                    } else {
                        res.status(200).json({ message: 'Email did not match' });
                    }
                }
            });
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

exports.signOut = (req, res) => {
    const token = req.headers['access-token'];
    try {
        jwtBlacklist.blacklist(token);
        res.status(200).json({ message: 'User is logged-out' });
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
