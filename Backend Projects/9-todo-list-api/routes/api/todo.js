const express = require('express');
const router = express.Router();
const todoListControllers = require('../../controllers/todoListControllers');
const verifyToken = require('../../middleware/verifyToken');

router
  .route('/')
  .get(verifyToken, todoListControllers.getTodoLists)
  .post(verifyToken, todoListControllers.addATodoList);

router
    .route('/:id')
    .put(verifyToken, todoListControllers.updateATodoList)
    .delete(verifyToken, todoListControllers.deleteATodoList);
    
module.exports = router;
