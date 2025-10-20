const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const todoListSchema = new Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

todoListSchema.plugin(AutoIncrement, {
  id: 'todo_list_seq',
  inc_field: 'id',
});

module.exports = mongoose.model('TodoList', todoListSchema);
