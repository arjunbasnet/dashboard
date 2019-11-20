const express = require('express');
const router = express.Router();
let User = require( "../models/User");
//get all users
router.get('/', async (req, res) => {
    let qParams = req.query
    let users = await User.find(qParams)
    return res.status(200).send(users);
});

//get one user
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let user = await User.findById(id);
    return res.status(200).send({
        error: false,
        user
    });
});


//create user
router.post('/', async (req, res) => {
    let user = await User.create(req.body);
    return res.status(201).send({
        error: false,
        user
    })
});

//update user
router.put(`/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
        error: false,
        user
    })

});

router.delete(`/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await User.findByIdAndDelete(id);

    return res.status(202).send({
        error: false,
        user
    })

});

module.exports = router;