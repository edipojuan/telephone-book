const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  emails: [
    {
      value: {
        type: String,
        lowercase: true
      },
      type: {
        type: String,
        required: true,
        enum: ['Pessoal', 'Trabalho', 'Outro'],
        default: 'Outro'
      }
    }
  ],
  phones: [
    {
      value: {
        type: String
      },
      type: {
        type: String,
        required: true,
        enum: ['Móvel', 'Fixo', 'Outro'],
        default: 'Outro'
      }
    }
  ],
  company: {
    type: String
  },
  office: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TelephoneBook = mongoose.model('TelephoneBook', schema);

module.exports = TelephoneBook;
