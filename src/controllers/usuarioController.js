const usuarioModel = require('../models/usuarioModel');

const usuarioController = {
  async listar(req, res) {
    try {
      const usuarios = await usuarioModel.listar();
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar usuários.' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const usuario = await usuarioModel.buscarPorId(req.params.id);
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
      res.status(200).json(usuario);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuário.' });
    }
  },

  async criar(req, res) {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Os campos nome e email são obrigatórios.' });
    }
    try {
      const id = await usuarioModel.criar({ nome, email });
      res.status(201).json({ id, nome, email });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ erro: 'E-mail já cadastrado.' });
      }
      res.status(500).json({ erro: 'Erro ao criar usuário.' });
    }
  },

  async atualizar(req, res) {
    const { nome, email } = req.body;
    if (!nome || !email) {
      return res.status(400).json({ erro: 'Os campos nome e email são obrigatórios.' });
    }
    try {
      const afetados = await usuarioModel.atualizar(req.params.id, { nome, email });
      if (!afetados) return res.status(404).json({ erro: 'Usuário não encontrado.' });
      res.status(200).json({ id: Number(req.params.id), nome, email });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ erro: 'E-mail já cadastrado.' });
      }
      res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
    }
  },

  async deletar(req, res) {
    try {
      const afetados = await usuarioModel.deletar(req.params.id);
      if (!afetados) return res.status(404).json({ erro: 'Usuário não encontrado.' });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao deletar usuário.' });
    }
  },
};

module.exports = usuarioController;
