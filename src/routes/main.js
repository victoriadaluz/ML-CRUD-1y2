// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

//usamos el metodo get de router para poder solicitar datos al servidor
router.get('/', mainController.index); 
router.get('/search', mainController.search); 
//usamos el metodo get en el buscador para poder hacer una peticion 
//como por ej: (params, body, y query string)

module.exports = router;
