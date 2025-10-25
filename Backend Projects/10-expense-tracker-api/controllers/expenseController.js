const Expense = require('../model/ExpenseETAPI');
const dayjs = require('dayjs');

const getExpenseLists = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { filter, startDate, endDate } = req.query;

    const today = new Date();
    let dateFilter = {};

    switch (filter) {
      case 'past_week':
        dateFilter = { $gte: dayjs().subtract(7, 'day').toDate() };
        break;
      case 'past_month':
        dateFilter = { $gte: dayjs().subtract(1, 'month').toDate() };
        break;
      case 'last_3_months':
        dateFilter = { $gte: dayjs().subtract(3, 'month').toDate() };
        break;
      case 'custom':
        if (startDate && endDate) {
          dateFilter = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          };
        }
        break;
      default:
        dateFilter = {};
    }

    const query = {
      email: req.user.email,
      ...(Object.keys(dateFilter).length && { date: dateFilter }),
    };

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Expense.countDocuments(query);

    res.status(200).json({
      data: expenses.map((expense) => ({
        id: expense.id,
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
        date: dayjs(expense.date).format('DD MMMM, YYYY'),
      })),
      page,
      limit,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addAExpense = async (req, res) => {
  try {
    const { title, description, amount, category } = req.body;
    if (!title || !description || !amount)
      return res
        .status(400)
        .json({ message: 'title, description and amount are required' });

    const expense = await Expense.create({
      title,
      description,
      category,
      amount: parseInt(amount),
      email: req.user.email,
    });

    res.status(201).json({
      id: expense.id,
      title: expense.title,
      description: expense.description,
      amount,
      category,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message:
          'Invalid category value. You can only use Groceries Leisure, Electronics, Utilities, Clothing, Health, Others',
      });
    }
    res.status(500).json({ error: err.message });
  }
};

const updateAExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, amount, category } = req.body;
    if (!title || !description || !amount)
      return res
        .status(400)
        .json({ message: 'title, description and amount are required' });

    const expense = await Expense.findOne({ id }).exec();
    if (!expense)
      return res.status(404).json({ message: 'Expense list not found' });

    if (expense.email !== req.user.email)
      return res.status(403).json({ message: 'Forbidden' });

    expense.title = title;
    expense.description = description;
    expense.amount = amount;
    expense.category = category;

    await expense.save();

    res.status(200).json({
      id: expense.id,
      title: expense.title,
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        message:
          'Invalid category value. You can only use Groceries Leisure, Electronics, Utilities, Clothing, Health, Others',
      });
    }

    res.status(500).json({ error: err.message });
  }
};

const deleteAExpenseList = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await Expense.findOne({ id }).exec();

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    if (expense.email !== req.user.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Expense.deleteOne({ id });

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getExpenseLists,
  addAExpense,
  updateAExpense,
  deleteAExpenseList,
};
