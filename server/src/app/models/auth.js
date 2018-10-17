const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcryptjs = require('bcryptjs');

const schema = new Schema({
  code: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

schema.pre('save', async function(next) {
  const hash = await bcryptjs.hash(this.code, 10);
  this.code = hash;
  next();
});

const Auth = mongoose.model('Auth', schema);

module.exports = Auth;
