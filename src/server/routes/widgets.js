const express = require('express');
const router = express.Router();
let Widget = require( "../models/Widget");

router.get('/', async (req, res) => {
    let widget = await Widget.find();
    return res.status(200).send(widget);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let widget = await Widget.findById(id);
    return res.status(200).send({
        error: false,
        widget
    });
});


router.post('/', async (req, res) => {
    let widget = await Widget.create(req.body);
    return res.status(201).send({
        error: false,
        widget
    })
});

router.put(`/:id`, async (req, res) => {
    const {id} = req.params;

    let widget = await Widget.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
        error: false,
        widget
    })

});

router.delete(`/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await Widget.findByIdAndDelete(id);

    return res.status(202).send({
        error: false,
        user
    })

});

module.exports = router;
