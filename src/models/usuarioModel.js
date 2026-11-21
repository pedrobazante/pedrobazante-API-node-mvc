const pool = require('../config/db');

const usuarioModel = {
  async listar() {
    const [rows] = await pool.query('SELECT id, nome, email, criado_em FROM usuarios');
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await pool.query(
      'SELECT id, nome, email, criado_em FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  async criar({ nome, email }) {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    return result.insertId;
  },

  async atualizar(id, { nome, email }) {
    const [result] = await pool.query(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );
    return result.affectedRows;
  },

  async deletar(id) {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

module.exports = usuarioModel;