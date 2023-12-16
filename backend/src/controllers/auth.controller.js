import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { settingDotEnvSecretKey } from "../config/dotenv.js";
import { createAccessToken } from "../middlewares/jwt.validator.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json(["El email ya esta en uso."]);
  try {
    //buscar forma de encriptar contraseña en formulario para que el post no tenga la contraseña sin encriptar
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();

    const token = await createAccessToken({ id: savedUser._id });
    res.cookie("token", token);
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error al registrar al usuario ", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) return res.status(400).json(["Error en las credenciales."]);

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(400).json(["Error en las credenciales."]);

    const token = await createAccessToken({ id: foundUser._id });
    res.cookie("token", token);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ message: "Error al logear al usuario ", error });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "User logged out" });
};

export const profile = async (req, res) => {
  try {
    const foundUser = await User.findById(req.user.id); // porque id no tiene _ ?
    if (!foundUser) return res.status(400).json({ message: "User not found" });
    res.status(200).json({ foundUser });
  } catch (error) {
    res.status(500).json({ message: "Error al entrar al perfil ", error });
  }
};

const {secret} = settingDotEnvSecretKey();
export const verifyToken = (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, secret, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
