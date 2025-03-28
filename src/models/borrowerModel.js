const db = require('../config/database');

class Borrower {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM borrowers');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM borrowers WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(borrowerData) {
    const { name, email, phone, address } = borrowerData;
    const [result] = await db.query(
      'INSERT INTO borrowers (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [name, email, phone, address]
    );
    return result.insertId;
  }

  static async update(id, borrowerData) {
    const { name, email, phone, address } = borrowerData;
    const [result] = await db.query(
      'UPDATE borrowers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
      [name, email, phone, address, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM borrowers WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Borrower; 