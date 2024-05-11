const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  brand: {
    type: String,
    required: true,
    minLength: 1,
  },
  description: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 300,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  size: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  num_in_stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

// TODO: Create 'catalog' route when implementing routes/controllers
itemSchema.virtual('url').get(function () {
  return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model('Item', itemSchema);
