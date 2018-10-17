'use strict';

const mongoose = require('mongoose');
const Model = mongoose.model('TelephoneBook');

exports.create = async (doc) => await Model.create(doc);
exports.update = async (id, data) => await Model.findByIdAndUpdate(id, data, {
  new: true
});
exports.delete = async (id) => await Model.findByIdAndRemove(id);
exports.get = async (data) => {
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      data = { ...data,
        [key]: new RegExp(data[key], 'i')
      };
    }
  }
  return await Model.find(data);
};