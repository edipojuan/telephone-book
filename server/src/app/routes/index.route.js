'use strict';

const express = require('express');
const router = express.Router();

const route = router.get('/', (req, res) => {
  res.send({
    name: 'Agenda telefônica',
    description: 'Agenda telefônica com autenticação via código.',
    date: '2018-10-12',
    author: 'Édipo Juan <edipojs@gmail.com>',
    version: '1.0.0'
  });
});

module.exports = route;