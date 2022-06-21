const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types

const ActionSchema = new Schema({
  description: String,
  cardId: {type: ObjectId, ref: 'Card'}

})

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;