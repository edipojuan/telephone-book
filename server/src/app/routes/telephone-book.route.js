'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./../controllers/telephone-book.controller');
const authService = require('./../services/auth.service');

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/:id', authService.authorize, controller.del);

module.exports = router;
