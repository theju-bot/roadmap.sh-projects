const TodoList = require('../model/TodoList');

const getTodoLists = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    // Fetch the todos for this user with pagination
    const todoLists = await TodoList.find({ email: req.user.email })
      .skip(skip)
      .limit(limit)
      .exec();

    // Get total number of todos for this user (for pagination info)
    const total = await TodoList.countDocuments({ email: req.user.email });

    res.status(200).json({
      data: todoLists.map((todoList) => ({
        id: todoList.id,
        title: todoList.title,
        description: todoList.description,
      })),
      page,
      limit,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addATodoList = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ message: 'title and description are required' });

    const todoList = await TodoList.create({
      title,
      description,
      email: req.user.email,
    });

    res.status(201).json({
      id: todoList.id,
      title: todoList.title,
      description: todoList.description,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateATodoList = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    if (!title || !description)
      return res
        .status(400)
        .json({ message: 'title and description are required' });

    const todoList = await TodoList.findOne({ id: id }).exec();
    if (!todoList)
      return res.status(404).json({ message: 'Todo list not found' });

    if (todoList.email !== req.user.email)
      return res.status(403).json({ message: 'Forbidden' });

    todoList.title = title;
    todoList.description = description;

    await todoList.save();

    res.status(200).json({
      id: todoList.id,
      title: todoList.title,
      description: todoList.description,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteATodoList = async (req, res) => {
  try {
    const id = req.params.id;
    const todoList = await TodoList.findOne({ id }).exec();

    if (!todoList) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    if (todoList.email !== req.user.email) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await TodoList.deleteOne({ id });

    res.status(200).json({ message: 'Todo list deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTodoLists,
  addATodoList,
  updateATodoList,
  deleteATodoList,
};
