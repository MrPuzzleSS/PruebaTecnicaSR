const { response } = require("express");
const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");
const { createAccessToken } = require("../libs/jwt.js");
const jwt = require("jsonwebtoken");
const {TOKEN_SECRET} = require("../../config.js");

const register = async (req, res = response) => {
  const { nombre, correo, clave } = req.body;

  try {

    const userFound = await Usuario.findOne({correo})
    if(userFound) 
      return res.status(400).json(['El correo ya esta en uso']);

    const claveHash = await bcrypt.hash(clave, 10);

    const newUser = new Usuario({
      nombre,
      correo,
      clave: claveHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id_usuario: userSaved.id_usuario });
    res.cookie("token", token);
    res.json({
      id_usuario: userSaved.id_usuario,
      nombre: userSaved.nombre,
      correo: userSaved.correo,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res = response) => {
  const { correo, clave } = req.body;

  if(!correo)
  return res.status(400).json({ message: "No hay parametros"})
  
  const userFound = await Usuario.findOne({
    where: { correo: correo } 
  });

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  try {
    const isMatch = await bcrypt.compare(clave, userFound.clave);

    if (!isMatch) return res.status(400).json({ message: "Clave incorrecta" });

    const token = await createAccessToken({ id_usuario: userFound.id_usuario });

    res.cookie("token", token);
    res.json({
      id_usuario: userFound.id_usuario,
      nombre: userFound.nombre,
      correo: userFound.correo,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = (req, res = response) =>{
  res.cookie("token", "", {
    expires: new Date(0),
  })
  return res.sendStatus(200);
};

const profile = async (req, res = response) => {
  const userFound = await Usuario.findByPk(req.user.id_usuario)

  if(!userFound) return res.status(400).json({ message: "Usuario no encontrado"});

  return res.json({
    id_usuario: userFound.id_usuario,
    nombre: userFound.nombre,
    correo: userFound.correo,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
}

const verifyToken = async (req, res = response) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) =>{
    if(err) return res.status(401).json({ message: "No autorizado" });

    const userFound = Usuario.findByPk(user.id_usuario)
    if(!userFound) return res.status(401).json({ message: "No autorizado"});

    return res.json({
      id_usuario: userFound.id_usuario,
      nombre: userFound.nombre,
      correo: userFound.correo
    })
  })
};


module.exports = {
  login,
  register,
  logout,
  profile,
  verifyToken
};
