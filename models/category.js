const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 300,
  },
});

categorySchema.virtual('url').get(function () {
  return `/catalog/category/${this.name}`;
});

module.exports = mongoose.model('Category', categorySchema);
