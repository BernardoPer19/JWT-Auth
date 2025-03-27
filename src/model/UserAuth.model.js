import bcrypt from "bcrypt";
import { pool } from "../db/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_PASSWORD, SALT_ROUNDS } from "../confing.js";

export class UserModel {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    return bcrypt.hash(password, salt);
  }

  static comparePassword(passwordUser, hashedPassword) {
    console.log("Comparando:", passwordUser, hashedPassword); // Log para ver si las contraseñas son iguales
    return bcrypt.compare(passwordUser, hashedPassword);
  }

  static async createToken(user) {
    if (!JWT_SECRET_PASSWORD) {
      throw new Error("JWT_SECRET_PASSWORD no está definido");
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        city: user.city,
        email: user.email,
      },
      JWT_SECRET_PASSWORD, // Asegúrate de que el secreto esté bien configurado
      { expiresIn: "2h" } // Expiración del token (2 horas)
    );

    if (!token) {
      throw new Error("El token no pudo ser generado.");
    }

    return token;
  }

  static async registerUserDB({ name, email, city, password }) {
    try {
      const hashedPassword = await this.hashPassword(password);
      const query = `
        INSERT INTO users_tb (name, email, city, password)
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, city;
      `;
      const values = [name, email, city, hashedPassword];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw new Error("No se pudo crear el usuario.");
    }
  }

  static async foundEmail(email) {
    try {
      const query = `SELECT * FROM users_tb WHERE email = $1;`;
      const values = [email];
      const { rows } = await pool.query(query, values);
      if (rows.length > 0) {
        return rows[0]; // Asegúrate de devolver todo el objeto, que incluirá la contraseña.
      }
      return null;
    } catch (error) {
      console.error("Error al buscar email:", error);
      throw new Error("No se pudo buscar el email.");
    }
  }
}
