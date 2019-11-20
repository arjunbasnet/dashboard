const express = require('express')
const router = express.Router()
let Task = require('../models/Task')


/** 
 * GET /api/tasks
 **/

router.get('/',async (req, res) => {
    // To do filter by users, always require user
    let {user} = req.query;
    if(!user){
        return res.status(200).send({
            error:true,
            error_message:"User id is required in order to list tasks"
        })
    }
    let tasks = await Task.find({user:user});
    return res.status(200).send({
        error:false,
        tasks
    });
})

/**
 * POST /api/tasks
 */
router.post('/', async (req, res) => {
    let task = await Task.create(req.body);
    return res.status(201).send({
        error: false,
        task
    })
});

/** 
 * PUT /api/taks/:id
 */
router.put(`/:id`, async (req, res) => {
    const {id} = req.params;

    let task = await Task.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
        error: false,
        task
    })

});

/** 
 * DELETE /api/tasks/:id
 */
router.delete(`/:id`, async (req, res) => {
    const {id} = req.params;

    let task = await Task.findByIdAndDelete(id);

    return res.status(202).send({
        error: false,
        task
    })

});

module.exports = router;