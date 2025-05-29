const express = require('express');
const pagarCarritoProductos = require('../controllers/servicios.controllers');
const router = express.Router()

//rutas
router.post("/", pagarCarritoProductos);

module.exports = router
