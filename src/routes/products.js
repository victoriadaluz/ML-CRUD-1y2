// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 

//usamos el metodo get de router para poder solicitar datos al servidor
//y mostrar todos los productos
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/create/', productsController.store); 
//usamos el metodo post para poder enviar y/o crear un dato

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 
//mostramos los detalles del pruducto

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id/', productsController.edit); 
router.put('/edit/:id', productsController.update); 
//usamos el metodo get para mostrar el formulario y 
//el metodo put para poder modificarlo, editarlo o reemplazarlo

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 
//usamos el metodo delete para eliminar el producto


module.exports = router;
