const Task = require('../models/tasks.model');


exports.getTasks = function (req, res) {
    try {
        Task.find({userId: req.userId}).exec((err, tasks) => {
            if (err) {
                res.status(400).json({message: err.message});
            } else {
                res.status(200).json({message: 'Data retrieved', tasks})
            }
        })
    } catch (error) {
        res.status(400).json({message: err.message});
    }
}

exports.createTask = function (req, res) {
    try {
        let task = new Task(
            req.body
        )
        task.userId = req.userId;
        task.save().then(tsk => {
            res.status(200).json({message: 'Task is created.', data: tsk});
        }).catch(err => {
            res.status(400).json({message: err.message});
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
