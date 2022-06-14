const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").then((boards) => {
    res.json(boards);
  });
};

const createBoard = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      let board = await Board.create(req.body.board)
      res.json({
        title: board.title,
        _id: board._id,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
      });
    }
    else {
      return next(new HttpError("The input field is empty.", 404));
    }
  } catch (err) {
      next(new HttpError("Creating board failed, please try again", 500))
  }
};

exports.getBoards = getBoards;
exports.createBoard = createBoard;
