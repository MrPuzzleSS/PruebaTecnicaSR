const Usuario = require('../models/usuario.model');
const { response } = require('express');

// Obtener todos los usuarios
const getUsuarios = async (req, res = response) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
}

// Obtener un usuario por ID
const getUsuarioById = async (req, res = response) => {
    const { id } = req.params;
    
    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
}

// Crear un nuevo usuario
const crearUsuario = async (req, res = response) => {
    const { nombre, correo, clave } = req.body;

    try {
        const nuevoUsuario = await Usuario.create({ nombre, correo, clave });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

// Actualizar un usuario por ID
const actualizarUsuario = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, correo, clave } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.update({ nombre, correo, clave });
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

// Eliminar un usuario por ID
const eliminarUsuario = async (req, res = response) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.destroy();
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
