const express = require('express');
const router = express.Router();
const authenticate = require('./middleware/authentication.middleware');

function routes() {
    
    const tasks = require('./routes/tasks.route');
    const users = require('./routes/users.route');
    const authentication = require('./routes/authentication.route');

    router.use('/tasks', authenticate, tasks);
    router.use('/users', users);
    router.use('/auth', authentication);
    return router;
}

module.exports = routes();
