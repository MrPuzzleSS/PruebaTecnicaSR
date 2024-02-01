const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

const Usuario = sequelize.define('usuario', {
  id_usuario: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[a-zA-Z\s]*$/,
    },
  },  
  correo: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: 'Por favor, ingrese un correo electrónico válido',
      },
    },
  },
  clave: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      len: {
        args: [6, 255], // Puedes ajustar el rango según tus requisitos
        msg: 'La contraseña debe tener al menos 6 caracteres',
      },
    },
  },
  estado: {
    type: DataTypes.ENUM('true', 'false'),
    defaultValue: 'true',
  }
}, {
  timestamps: true,
});


module.exports = Usuario;
