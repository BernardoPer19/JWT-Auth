import { UserModel } from "../model/UserAuth.model.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, name, city } = req.body;

    const isFoundEmail = await UserModel.foundEmail(email);
    if (isFoundEmail) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const passwordHashed = await UserModel.hashPassword(password);

    const newUser = await UserModel.registerUserDB({
      name,
      email,
      city,
      password: passwordHashed,
    });

    return res.status(201).json({ newUser });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.foundEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log("Password ingresado:", password);
    console.log("Contraseña en base de datos:", user.password);

    
    const isPasswordValid =  UserModel.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = await UserModel.createToken(user);
    console.log("Password ingresado:", password);
    console.log("Contraseña en base de datos:", user.password);

    const options = {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 1000 * 60 * 60, // 1 hora
    };

    res
      .cookie("access_token", token, options)
      .status(200)
      .json({ message: "Login exitoso" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error en el login", error: error.message });
  }
};

export const protectedRoute = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autorizado" });
    }
    return res
      .status(200)
      .json({ message: "Usuario autorizado", user: req.user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en la solicitud", error: error.message });
  }
};
