'use strict';

const repository = require('../repositories/telephone-book.repository');

exports.get = async (req, res, next) => {
  try {
    const contacts = await repository.get(req.query);
    res.send(contacts);
  } catch (err) {
    return printError(res, err, 'obter a agenda telefônica.');
  }
};

exports.post = async (req, res, next) => {
  try {
    const { emails, phones } = req.body;

    req.body.emails = itensValid(emails);
    req.body.phones = itensValid(phones);

    const contact = await repository.create(req.body);
    return res.status(201).send(contact);
  } catch (err) {
    return printError(res, err, 'adicionar um contato');
  }
};

exports.put = async (req, res, next) => {
  try {
    const { emails, phones } = req.body;

    req.body.emails = itensValid(emails);
    req.body.phones = itensValid(phones);

    const contact = await repository.update(req.params.id, req.body);
    return res.send(contact);
  } catch (err) {
    return printError(res, err, 'alterar o contato');
  }
};

exports.del = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({ message: 'Contato excluído com sucesso' });
  } catch (err) {
    return printError(res, err, 'excluir o contato');
  }
};

const itensValid = (itens) => {
  if (itens) {
    let itensValid = [];
    for (let index = 0; index < itens.length; index++) {
      if (itens[index].value && itens[index].value.trim().length > 0) {
        itensValid = [...itensValid, itens[index]];
      }
    }
    return itensValid;
  }
  return undefined;
};

const printError = (res, data, message) =>
  res.status(400).send({
    message: `Falha ao ${message}`,
    data
  });
