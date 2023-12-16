import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío.")
    .isLength({ min: 6 })
    .withMessage("El nombre de usuario debe tener al menos 6 caracteres."),
  body("email")
    .isEmail()
    .withMessage("Ingrese un email valido.")
    .notEmpty()
    .withMessage("El email no puede estar vacío."),
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía.")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
];

export const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Ingrese un email valido.")
    .notEmpty()
    .withMessage("El email no puede estar vacío."),
  body("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía.")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
];

export const handleErrorValidations = (req,res,next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json([error.errors[0].msg])
    }
    next();
}