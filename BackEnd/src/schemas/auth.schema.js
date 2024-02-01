const {z} = require('zod');

const registerSchema =  z.object({
    nombre: z.string({
        required_error: 'El nombre es requerido'
    }).min(3).max(255),
    correo: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'El correo no es valido'
    }),
    clave: z.string({
        required_error: 'La clave es requerida'
    })
    .min(6, {
        message: 'La clave debe tener al menos 6 caracteres'
    }),
});

const loginSchema =  z.object({
    correo: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'El correo no es valido'
    }),
    clave: z.string({
        required_error: 'La clave es requerida'
    })
    .min(6, {
        message: 'La clave debe tener al menos 6 caracteres'
    }),
});

module.exports = {
    registerSchema,
    loginSchema
}