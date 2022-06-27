const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required'],
  },
  description: String,
  listId: { type: ObjectId, ref: 'List' },
  boardId: { type: ObjectId, ref: 'Board' },
  labels: [String],
  position: Number,
  actions: [{ type: ObjectId, ref: 'Action' }],
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
