const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');

const expenseController = require('../../controllers/expenseController');

router
  .route('/')
  .get(verifyJWT, expenseController.getExpenseLists)
  .post(verifyJWT, expenseController.addAExpense);

router
  .route('/:id')
  .put(verifyJWT, expenseController.updateAExpense)
  .delete(verifyJWT, expenseController.deleteAExpenseList);

module.exports = router;