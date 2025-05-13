import { Pool } from "mysql2/promise";
import pool from "../config/db";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
}

export class UserModel {
  static async create(user: Omit<User, "id">): Promise<string> {
    const id = uuidv4();
    await pool.query(
      "INSERT INTO users (id, name, email, phone_number) VALUES (?, ?, ?, ?)",
      [id, user.name, user.email, user.phone_number]
    );
    return id;
  }

  // Update other methods to use string IDs
  static async getById(id: string): Promise<User | null> {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return (rows as User[])[0] || null;
  }

  static async getAll(): Promise<User[] | null> {
    const [rows] = await pool.query("SELECT * FROM users");
    return (rows as User[]) || null;
  }

  static async update(id: string, user: Partial<User>): Promise<boolean> {
    const [result] = await pool.query("UPDATE users SET ? WHERE id = ?", [
      user,
      id,
    ]);
    return (result as any).affectedRows > 0;
  }

  static async delete(id: string): Promise<boolean> {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return (result as any).affectedRows > 0;
  }
}
