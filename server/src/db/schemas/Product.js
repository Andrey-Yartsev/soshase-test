const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');
const mongoosePaginate = require('mongoose-paginate');

const productScheme = mongoose.Schema({
  id: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    required: true
  },
  buyPrice: {
    type: Number
  },
  price: {
    type: Number
  },
  category: {
    type: String
  }
});
productScheme.plugin(AutoIncrement, {inc_field: 'id'});
productScheme.plugin(mongoosePaginate);

module.exports = productScheme;