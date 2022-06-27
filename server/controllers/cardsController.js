const Card = require('../models/card');
const Board = require('../models/board');
const List = require('../models/list');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const createCard = async (req, res, next) => {
  const card = req.body.card;
  const listId = req.body.listId;

  const errors = validationResult(req);

  try {
    if (errors.isEmpty()) {
      let list = await List.findById(listId);
      let boardId = list.boardId;

      const newCard = await Card.create({
        listId,
        boardId,
        ...card,
      });

      list.cards.push(newCard);
      await list.save();

      await Board.updateOne(
        { _id: boardId },
        { $push: { cards: [newCard._id] } }
      );

      res.json(newCard);
    } else {
      return next(new HttpError('List ID field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError('Creating card failed, please try again', 500));
  }
};

const editCard = async (req, res, next) => {
  const cardEdit = req.body.card;
  const cardId = req.params.id;

  const errors = validationResult(req);

  try {
    if (errors.isEmpty()) {
      const newCard = await Card.findOneAndUpdate(
        { _id: cardId },
        { ...cardEdit },
        {
          new: true,
        }
      );

      res.json(newCard);
    } else {
      next(new HttpError('Validation errors; missing payload field.', 404));
    }
  } catch (err) {
    next(new HttpError('Edit card failed', 500));
  }
};
const fetchCard = async (req, res, next) => {
  const cardId = req.params.id;

  try {
    const card = await Card.findById(cardId);
    res.json(card);
  } catch (err) {
    next(new HttpError('Fetch card failed', 500));
  }
};

exports.createCard = createCard;
exports.editCard = editCard;
exports.fetchCard = fetchCard;
