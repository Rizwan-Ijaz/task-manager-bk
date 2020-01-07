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

exports.createTask = async function (req, res) {
    try {
        let task = new Task(req.body)
        task.userId = req.userId;
        await task.save();
        res.status(200).json({message: 'Task is created.', data: task});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.updateTask = async function (req, res) {

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({message: 'Task is updated.', data: task});
    } catch (exception) {
        res.status(400).json({message: exception.message});
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndRemove(req.params.id);
        res.status(201).json({message: 'Task is deleted.'});
    } catch (exception) {
        res.status(400).json({message: exception.message});
    }
};
