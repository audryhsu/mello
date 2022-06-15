const { check } = require('express-validator');

exports.validateBoard = [check('board.title').not().isEmpty()];

exports.validateList = [
  check('list.title').not().isEmpty(),
  check('boardId').not().isEmpty(),
];

exports.validateCard = [
  check('listId').not().isEmpty(),
  check('card.title').not().isEmpty(),
];
