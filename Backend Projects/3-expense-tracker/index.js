const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const { program } = require('commander');

const folderPath = path.join(__dirname, 'data');
const filePath = path.join(__dirname, 'data', 'list.json');

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(folderPath);
  fs.writeFileSync(filePath, '[]');
}

const loadExpenses = () => JSON.parse(fs.readFileSync(filePath));
const saveExpenses = (data) =>
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
const currentDate = () => {
  const now = new Date();
  return dayjs(now).format('YYYY-MM-DD HH:mm:ss');
};

program
  .name('expense-tracker')
  .description('A simple expense tracking CLI tool')
  .version('1.0.0');

program
  .command('add')
  .description('Add a new Expense')
  .requiredOption('--description <desc>', 'Expense description')
  .requiredOption('--amount <amount>', 'Expense amount')
  .action((options) => {
    const expenses = loadExpenses();
    const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1;
    const date = currentDate();

    expenses.push({
      id,
      date,
      description: options.description,
      amount: parseInt(options.amount),
    });

    saveExpenses(expenses);
    console.log(`# Expense added successfully (ID: ${id})`);
  });

program
  .command('list')
  .description('Show all the expenses')
  .action((option) => {
    const expenses = loadExpenses();

    expenses.forEach((e) => {
      console.log(`${e.id}   ${e.date}   ${e.description}   $${e.amount}`);
    });
  });

program
  .command('summary')
  .description('Show total expenses')
  .option('--month <month>', 'Filter by month (1–12)')
  .action((option) => {
    const expenses = loadExpenses();
    if (!option.month) {
      const total = expenses.reduce((sum, e) => sum + e.amount, 0);
      console.log(`# Total expenses: $${total}`);
    } else {
      expense = expenses.filter(
        (e) => dayjs(e.date).month() + 1 == option.month
      );
      if (expense.length === 0) {
        console.log('No expenses found from this month.');
        return;
      }
      const total = expense.reduce((sum, e) => sum + e.amount, 0);
      console.log(
        `# Total expenses for ${dayjs()
          .month(option.month - 1)
          .format('MMMM')}: $${total}`
      );
    }
  });

program
  .command('delete')
  .description('Delete an expense')
  .requiredOption('--id <id>', 'Expense id')
  .action((option) => {
    const expenses = loadExpenses();
    const filtered = expenses.filter((e) => e.id !== parseInt(option.id));
    if (filtered.length === expenses.length) {
      console.log(`Expense ID: ${option.id} not found.`);
    } else {
      saveExpenses(filtered);
      console.log(`# Expense deleted successfully (ID: ${option.id})`);
    }
  });

program.parse(process.argv);
