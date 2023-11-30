import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //buscar forma de encriptar contraseña en formulario para que el post no tenga la contraseña sin encriptar
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    jwt.sign(
      { id: savedUser._id },
      "proyectoFinal",
      { expiresIn: "10h" },
      (err, token) => {
        if (err) {
          console.log(err);
        }
        res.cookie("token", token);
        res.json({ savedUser });
      }
    );

    // res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar al usuario ", error });
  }
};

export const login = async (req, res) => {};
