const { check, oneOf } = require('express-validator');

exports.validateBoard = [check('board.title').not().isEmpty()];

exports.validateList = [
  check('list.title').not().isEmpty(),
  check('boardId').not().isEmpty(),
];

exports.validateEditList = [
  check('title').not().isEmpty(),
  check('position').not().isEmpty(),
];

exports.validateCard = [
  check('listId').not().isEmpty(),
];

exports.validateEditCard = oneOf(
  "title listId position description archived dueDate completed labels"
    .split(' ')
    .map(field => check(`card.${field}`).exists()));
