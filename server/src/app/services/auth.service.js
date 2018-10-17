'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
  const expiresIn = 120;
  const idToken = jwt.sign(data, global.SALT_KEY, { expiresIn });
  return { idToken, expiresIn };
};

exports.authorize = function(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ erro: 'O token não foi informado' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ erro: 'O token não contém duas partes' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ erro: 'O Token não está no formato correto' });
  }

  jwt.verify(token, global.SALT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ erro: 'Token inválido' });
    }

    return next();
  });
};
