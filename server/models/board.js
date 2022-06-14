const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  },
  lists:[
    {type: Schema.Types.ObjectId, ref: 'List'}
  ]
})

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;

// // To add new child collection element

// var r = new Recipe();

// r.name = 'Blah';
// r.ingredients.push('mongo id of ingredient');

// r.save();