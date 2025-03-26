import { UserModelA } from "../model/UserModel.model.js";

// Ver todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModelA.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
  }
};

// Ver un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModelA.getUserById(id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, city, password } = req.body;

  try {
    const updatedUser = await UserModelA.updateUser(id, { name, email, city, password });
    if (updatedUser) {
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModelA.deleteUser(id);
    if (deletedUser) {
      return res.status(200).json({ message: "Usuario eliminado correctamente", deletedUser });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
  }
};
