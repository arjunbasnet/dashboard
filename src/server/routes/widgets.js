'user strict'

const express = require('express')
const Widget = require('../models/Widget')
const router = express.Router();


/** 
 * GET /api/widgets 
 * 
**/
router.get('/',(req,res,next)=>{
    Widget.find({})
        .then(widgets =>{
            res.send(widgets)
        })
        .catch(err =>{
            next(err)
        })
})

/**
 * POST /api/widgets
 */
router.post('/',(req,res,next)=>{
    let widget = new Widget({
        name: req.body.name,
        type: req.body.type
    })

    
    widget.save()
        .then(doc =>{
            res.send(doc)
        })
        .catch(err =>{
            next(err)
        })
})

module.exports = router