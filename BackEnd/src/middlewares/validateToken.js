const { response } = require("express");
const jwt = require('jsonwebtoken');
const {TOKEN_SECRET} = require('../../config.js')

const authRequired = (req, res = response, next) =>{
    const { token } = req.cookies;
    
    if (!token) 
        return res.status(401).json({message: "No token, autorizacion denegada"});

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({ message: "Token Invalido"});

            req.user = user

            next();
    })
}

module.exports = {
    authRequired
}
