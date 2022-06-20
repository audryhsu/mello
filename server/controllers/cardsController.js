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

      let list = await List.findByIdAndUpdate(
        { _id: listId },
        { $push: { cards: [newCard._id] } }
      );
      let boardId = list.boardId;
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
  console.log(errors);
  
  try {
    if (errors.isEmpty()) {
      // const oldCard = await Card.findById(cardId);
      const newCard = await Card.updateOne({_id: cardId}, {...cardEdit})
      console.log("cardEdit:", cardEdit,
      "\nnewCard:", newCard)
      
      res.json(newCard);
    } else {
      next(new HttpError('Validation errors; missing payload field.', 404));
    }
  } catch (err) {
    next(new HttpError('Edit card failed', 500));
  }
}

exports.createCard = createCard;
exports.editCard = editCard;
