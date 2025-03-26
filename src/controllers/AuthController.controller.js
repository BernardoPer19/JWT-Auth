import { UserModel } from "../model/UserAuth.model.js";
import { validateRegister } from "../schemas/RegisterSchema.js";

export const registerUser = async (req, res) => {
  try {
    const validateData = validateRegister(req.body);
    const { email, password, name, city } = validateData;

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
    return res.status(400).json({ message: error.message });
  }
};
