import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../middlewares/jwt.validator.js";

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

    if (!foundUser) return res.status(400).json({ message: "User not found" });

    const match =  await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(400).json({message : "Password mismatch" });

    const token = await createAccessToken({ id: foundUser._id });
    res.cookie("token", token);
    res.status(200).json(foundUser);

  } catch (error) {

    res.status(500).json({ message: "Error al logear al usuario ", error });
  }
};
