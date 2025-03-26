import bcrypt from "bcrypt";
import { pool } from "../db/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_PASSWORD,SALT_ROUNDS } from "../confing.js";

export class UserModel {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    return bcrypt.hash(password, salt);
  }

  static comparePassword(passwordUser, hashedPassword) {
    return bcrypt.compare(passwordUser, hashedPassword);
  }

  static async createToken(user) {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        city: user.city,
        email: user.email,
      },
      JWT_SECRET_PASSWORD,
      { expiresIn: "1h" }
    );
  }

  static async registerUserDB({ name, email, city, password }) {
    try {
      // Hash de la contraseña
      const hashedPassword = await this.hashPassword(password);
      // Query y valores
      const query = `
        INSERT INTO users_tb (name, email, city, password) 
        VALUES ($1, $2, $3, $4) 
       RETURNING id, name, email, city;
      `;
      const values = [name, email, city, hashedPassword];

      // Ejecutar query
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("🔴 Error al crear usuario:", error);
      throw new Error("No se pudo crear el usuario.");
    }
  }

  static async foundEmail(email) {
    try {
      const query = `SELECT * FROM users_tb WHERE email = $1;`;
      const values = [email];

      const { rows } = await pool.query(query, values);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("🔴 Error al buscar email:", error);
      throw new Error("No se pudo buscar el email.");
    }
  }
}
