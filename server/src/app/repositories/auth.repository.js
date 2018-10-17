'use strict';

const mongoose = require('mongoose');
const Model = mongoose.model('Auth');

exports.create = async (data) => await Model.create(data);
exports.get = async () => await Model.findOne({}).select('+code');