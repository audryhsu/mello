const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const CommentSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Comment title is required'],
  },
  cardId: { type: ObjectId, ref: 'Card' },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;