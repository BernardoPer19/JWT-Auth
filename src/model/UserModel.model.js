import { pool } from "../db/db.js";

export class UserModelA {
  static async getAllUsers() {
    try {
      const query = "SELECT * FROM users_tb;";
      const { rows } = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("🔴 Error al obtener todos los usuarios:", error);
      throw new Error("No se pudo obtener la lista de usuarios.");
    }
  }

  static async getUserById(id) {
    try {
      const query = "SELECT * FROM users_tb WHERE id = $1;";
      const values = [id];
      const { rows } = await pool.query(query, values);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("🔴 Error al obtener usuario por ID:", error);
      throw new Error("No se pudo obtener el usuario.");
    }
  }

  static async updateUser(id, { name, email, city, password }) {
    try {
      const query = `
        UPDATE users_tb 
        SET name = $1, email = $2, city = $3, password = $4 
        WHERE id = $5 
        RETURNING *;
      `;
      const values = [name, email, city, password, id];
      const { rows } = await pool.query(query, values);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("🔴 Error al actualizar usuario:", error);
      throw new Error("No se pudo actualizar el usuario.");
    }
  }

  static async deleteUser(id) {
    try {
      const query = "DELETE FROM users_tb WHERE id = $1 RETURNING *;";
      const values = [id];
      const { rows } = await pool.query(query, values);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error("🔴 Error al eliminar usuario:", error);
      throw new Error("No se pudo eliminar el usuario.");
    }
  }
}
