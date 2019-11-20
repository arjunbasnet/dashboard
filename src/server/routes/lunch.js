const express = require('express')
const ResturantMenu = require('../service/ResturantMenu')
const router = express.Router()

/** 
 * GET /api/lunch
 * list today's lunch for given resturant
 */
router.get('/:resturant',async (req, res) => {
    const {resturant} = req.params
    let menuProvider = new ResturantMenu(resturant)
    let menus = await menuProvider.getMenus()
    res.status(200).send({
        error:false,
        menus})
})

module.exports = router;