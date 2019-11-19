const express = require('express');
const router = express.Router();
let WidgetConfig = require( "../models/WidgetConfig");

router.get('/', async (req, res) => {
    let widget = await WidgetConfig.find();
    return res.status(200).send(widget);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let widget = await WidgetConfig.findById(id);
    return res.status(200).send({
        error: false,
        widget
    });
});


router.post('/', async (req, res) => {
    let widget = await WidgetConfig.create(req.body);
    return res.status(201).send({
        error: false,
        widget
    })
});

router.put(`/:id`, async (req, res) => {
    const {id} = req.params;

    let widget = await WidgetConfig.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
        error: false,
        widget
    })

});

router.delete(`/:id`, async (req, res) => {
    const {id} = req.params;

    let user = await WidgetConfig.findByIdAndDelete(id);

    return res.status(202).send({
        error: false,
        user
    })

});

module.exports = router;