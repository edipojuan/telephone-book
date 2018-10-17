'use strict';

const bcrypt = require('bcryptjs');

const authService = require('./../services/auth.service');

const repository = require('../repositories/auth.repository');

exports.post = async (req, res, next) => {
  try {
    const {
      code
    } = req.body;

    const auth = await repository.create({
      code
    });

    const token = await authService.generateToken({
      code: auth.code
    });

    return res.status(201).send(token);
  } catch (err) {
    return printError(res, err, 'cadastrar o código');
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    if (!req.body.code) {
      return res.status(400).send({
        erro: 'Informe um código'
      });
    }

    const auth = await repository.get();

    if (!auth) {
      return res.status(400).send({
        erro: 'Código não cadastrado'
      });
    }

    if (!auth.code) {
      return res.status(400).send({
        erro: 'Código não encontrado'
      });
    }

    if (!(await bcrypt.compare(req.body.code, auth.code))) {
      return res.status(400).send({
        erro: 'Código inválido'
      });
    }

    const {
      code,
      createdAt
    } = auth;
    const token = await authService.generateToken({
      code,
      createdAt
    });

    res.send(token);
  } catch (err) {
    return printError(res, err, 'autenticar');
  }
};

const printError = (res, data, message) => res.status(400).send({
  message: `Falha ao ${message}`,
  data
});