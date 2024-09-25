const express = require("express");
const router = express.Router()
const Restaurant = require("../models/index")
const {check, validationResult} = require('express-validator')

router.get('/', async (req, res) => {
    let result = await Restaurant.findAll()
    res.json(result)
})
router.get('/:id', async (req, res) => {
    let result = await Restaurant.findByPk(req.params.id)
    res.json(result)
})
router.post('/test', async (req, res) => {
    let result = await Restaurant.create({name: 'AppleTest',
        location: 'Test',
        cuisine: 'Fasttest'})
    res.json(result)
    
})
router.post('/', [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim()], async (req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.array()})
        }
        else {
    
        let result = await Restaurant.create(req.body)
    res.json(result)
}})
router.put('/:id', async (req, res) => {

    let result = await Restaurant.update(req.body,{where:{id :req.params.id}})
    res.json(result)
})
router.put('/test/:id', async (req, res) => {

    let result = await Restaurant.update({name: 'AppleTest2'},{where:{id :req.params.id}})
    res.json(result)
})
router.delete('/:id', async (req, res) => {
    let result = await Restaurant.destroy({where:{id:req.params.id}})
    res.json(result)
})
module.exports = router