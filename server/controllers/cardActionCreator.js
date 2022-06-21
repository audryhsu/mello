const Card = require('../models/card');
const Action = require('../models/action');
const { validationResult } = require('express-validator');
/*

const createCardAction = async (req, res, next) => {
  const cardId = req.params.id;
  const updatedCard = req.body;
  
  

  - `title`
  - `listId`
  - `position`
  - `description`
  - `archived`
  - `dueDate`
  - `completed`
  - `labels`
  // create model for action
  // create new action in DB with description, get _id and created/updatedAt back
  
  try {
    await Action.create({
      description,
      cardId,
    })
    
  } catch (error) {
    
  }
  
  req.action = {
    
  }
  next()
  
}
*/