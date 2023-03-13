const express = require('express');
const router = express.Router();
const Task = require('../controllers/task')


const tasksListCallback =
    res =>
        Task.tasksList()
            .then(
                tasks => {

                    const pendingTasks = tasks.filter(e => !e.isCompleted);
                    const completedTasks = tasks.filter(e => e.isCompleted);

                    res.render(
                        'tasks',
                        {
                            pendingTasks : pendingTasks,
                            completedTasks : completedTasks
                        }
                    );
                }
            )
            .catch(
                err => {
                    res.render('error', {error: err})
                }
            );

/* GET home page. */
router.get(

    '/',

    (req, res, next) => {
        tasksListCallback(res)
    }
)

/* POST request. */
router.post(

    '/',

    (req, res) => {

        if(req.body.date == '' || req.body.name == '' || req.body.description == ''){
            tasksListCallback(res);
            return;
        }

        Task.addTask(req.body)
            .then(
                tasksListCallback(res)
            )
    }
)

/* GET confirm. */
router.get(

    '/tasks/confirm/:idTask',

    (req, res) => {

        Task.confirmTask(req.params.idTask)
            .then(
                res.redirect('/')
            )
    }
)

/* GET confirm. */
router.get(

    '/tasks/delete/:idTask',

    (req, res) => {

        Task.deleteTask(req.params.idTask)
            .then(
                res.redirect('/')
            )
    }
)

module.exports = router
