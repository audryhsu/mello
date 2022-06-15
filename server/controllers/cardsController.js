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
      const newCard = await Card.create({
        listId,
        ...card,
      });

      await List.updateOne(
        { _id: listId },
        { $push: { cards: [newCard._id] } }
      );
      res.json(newCard);
    } else {
      return next(new HttpError('The card title field is empty.', 404));
    }
  } catch (err) {
    next(new HttpError('Creating card failed, please try again', 500));
  }
};

exports.createCard = createCard;
