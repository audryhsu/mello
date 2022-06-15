const List = require('../models/list');
const Board = require('../models/board');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const createList = async (req, res, next) => {
  const errors = validationResult(req);

  try {
    if (errors.isEmpty()) {
      let list = await List.create({
        ...req.body.list,
        boardId: req.body.boardId,
      });

      await Board.updateOne(
        { _id: req.body.boardId },
        { $push: { lists: [list] } }
      );
      res.json(list);
    } else {
      return next(new HttpError('The input field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError('Creating list failed, please try again', 500));
  }
};

exports.createList = createList;
