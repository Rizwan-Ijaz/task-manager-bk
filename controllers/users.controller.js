const User = require('../models/users.model');
const bcrypt = require('bcrypt');

exports.registerUser = function (req, res) {
    try {
        const requestBody = req.body;
        const password = requestBody.password;
        bcrypt.hash(password, 10, (error, hash) => {
            if (error) {
                console.log('Error: ' + error.message);
                res.status(500).json({ message: error.message });
                return;
            } else {
                requestBody.password = hash;
                const user = new User(requestBody);
                user.save().then(user => {
                    res.status(201).json(user);
                }).catch(error => {
                    res.status(500).json({ message: error.message });
                });
            }
        });
    } catch (error) {

    }


}