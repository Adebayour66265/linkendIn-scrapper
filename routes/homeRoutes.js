const express = require('express');
const routes = express.Router();


routes.get('/', (req, res) => {
    res.render('home')
})

module.exports = routes;