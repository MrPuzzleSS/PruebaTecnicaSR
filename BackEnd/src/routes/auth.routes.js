const { Router } = require("express");
const route = Router();
const { authRequired } = require("../middlewares/validateToken.js");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const { registerSchema, loginSchema } = require("../schemas/auth.schema.js");
const {
  login,
  register,
  logout,
  profile,
  verifyToken
} = require("../controllers/auth.controller");

route.post("/login", validateSchema(loginSchema), login);

route.post("/register", validateSchema(registerSchema), register);

route.post("/logout", logout);

route.get("/profile", authRequired, profile);

route.get("/verify", verifyToken);

module.exports = route;
