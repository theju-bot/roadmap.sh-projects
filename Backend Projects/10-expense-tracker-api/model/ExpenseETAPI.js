const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const expenseETAPISchema = new Schema(
  {
    id: { type: Number },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      get: (v) =>
        v instanceof Date
          ? v.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          : '',
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Groceries',
        'Leisure',
        'Electronics',
        'Utilities',
        'Clothing',
        'Health',
        'Others',
      ],
      default: 'Others',
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

expenseETAPISchema.plugin(AutoIncrement, {
  id: 'expense_list_seq',
  inc_field: 'id',
});

module.exports = mongoose.model('ExpenseETAPISchema', expenseETAPISchema);
