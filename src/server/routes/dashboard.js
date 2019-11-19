const express = require('express');
const router = express.Router();
let DashboardConfig = require( "../models/DashboardConfig");

router.get('/', async (req, res) => {
    let dash = await DashboardConfig.find();
    return res.status(200).send(dash);
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let dash = await DashboardConfig.findById(id);
    return res.status(200).send({
        error: false,
        dash
    });
});


router.post('/', async (req, res) => {
    let dash = await DashboardConfig.create(req.body);
    return res.status(201).send({
        error: false,
        dash
    })
});

router.put(`/:id`, async (req, res) => {
    const {id} = req.params;

    let dash = await DashboardConfig.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
        error: false,
        dash
    })

});

router.delete(`/:id`, async (req, res) => {
    const {id} = req.params;

    let dash = await DashboardConfig.findByIdAndDelete(id);

    return res.status(202).send({
        error: false,
        dash
    })

});

module.exports = router;