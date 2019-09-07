const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, 'TM', (err, data) => {
            if (err) {
                res.status(401).json({message: 'Token not correct.'});
                return;
            } else {
                Object.assign(req, {userId: data.user});
                next();
            }
        })
    } else {
        res.status(262).json({message: 'Token not correct.'});
        return;
    }
}
