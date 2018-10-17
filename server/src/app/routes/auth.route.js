'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./../controllers/auth.controller');
const authService = require('./../services/auth.service');

router.post('/create', authService.authorize, controller.post);
router.post('/', controller.authenticate);

module.exports = router;
