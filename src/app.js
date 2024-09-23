const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");
const seed = require("../seedData")
//TODO: Create your GET Request Route Below: 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/restaurants', async (req, res) => {
    let result = await Restaurant.findAll()
    res.json(result)
})
app.get('/restaurants/:id', async (req, res) => {
    let result = await Restaurant.findByPk(req.params.id)
    res.json(result)
})
app.post('/restaurants/test', async (req, res) => {
    let result = await Restaurant.create({name: 'AppleTest',
        location: 'Test',
        cuisine: 'Fasttest'})
    res.json(result)
    
})
app.post('/restaurants/', async (req, res) => {
    let result = await Restaurant.create(req.body)
    res.json(result)
})
app.put('/restaurants/:id', async (req, res) => {

    let result = await Restaurant.update(req.body,{where:{id :req.params.id}})
    res.json(result)
})
app.put('/restaurants/test/:id', async (req, res) => {

    let result = await Restaurant.update({name: 'AppleTest2'},{where:{id :req.params.id}})
    res.json(result)
})
app.delete('/restaurants/:id', async (req, res) => {
    let result = await Restaurant.destroy({where:{id:req.params.id}})
    res.json(result)
})


module.exports = app;