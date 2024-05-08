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

// TODO: Create 'catalog' route when implementing routes/controllers
categorySchema.virtual('url').get(function () {
  return `/catalog/category/${this._id}`;
});

module.exports = mongoose.model('Category', categorySchema);
