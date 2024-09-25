const express = require("express");
const app = express();
const router = require('../routes/restaurants')

const port = 3000;

//TODO: Create your GET Request Route Below:

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/restaurants', router) 


module.exports = app;