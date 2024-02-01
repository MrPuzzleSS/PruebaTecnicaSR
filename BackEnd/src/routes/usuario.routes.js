const { Router } = require('express');
const route = Router();
const { authRequired } = require("../middlewares/validateToken.js");

const { getUsuarios, getUsuarioById, crearUsuario, eliminarUsuario, actualizarUsuario } = require('../controllers/usuario.controller'); 

route.get('/usuarios', authRequired, getUsuarios);
route.get('/usuario/:id', authRequired, getUsuarioById)
route.post('/usuario', crearUsuario)
route.put('/usuario/:id', authRequired, actualizarUsuario)
route.delete('/usuario/:id', authRequired, eliminarUsuario)

module.exports = route;