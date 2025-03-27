// En authenticate.js
import jwt from "jsonwebtoken";
import { JWT_SECRET_PASSWORD } from "../confing.js";

export const authenticate = (req, res, next) => {
  const token = req.cookies.access_token; // Obtenemos el token de las cookies

  if (!token) {
    return res.status(401).json({ message: "No autorizado. No se encontró el token." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_PASSWORD); // Verificamos el token
    req.user = decoded; // Decodificamos y almacenamos el usuario en la request
    next(); // Continuamos con la siguiente función
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};
