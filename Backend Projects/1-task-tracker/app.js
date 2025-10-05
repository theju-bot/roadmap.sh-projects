const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const folderPath = path.join(__dirname, 'data');
const filePath = path.join(__dirname, 'data', 'list.json');

let list;
let obj;

const fileChecking = async () => {
  try {
    await fsPromises.access(folderPath);
  } catch (error) {
    await fsPromises.mkdir(folderPath);
  }

  try {
    await fsPromises.access(filePath);
  } catch (error) {
    await fsPromises.writeFile(filePath, '[]');
  }
  console.log(
    `
    For add event use "add description" command or "1 'description'"
    For update event use "update 'id' 'description'" command or "2 'id' 'description'"
    For delete event use "delete 'id'" command or "3 'id'"
    To mark task as in progress use "mark-in-prog 'id'" command or "4 'id'"
    To mark task as finished event use "mark-done 'id'" command or "5 'id'"
    To view tasks "list" or "6"
    To view tasks to do "list-todo" or "7"
    To view tasks in progress "list-in-progress" or "8"
    To view tasks done "list-done" or "9"
    To exit use "exit" command or "10"
    `
  );
  rl.prompt();
  rl.on('line', (input) => {
    const [command, ...args] = input.trim().split(' ');
    const arg = args.join(' ');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;
      try {
        list = JSON.parse(data);
      } catch (err) {
        console.log('List is empty');
        rl.prompt();
        return;
      }

      if (command === 'add' || command === '1') {
        addData(arg, list);
      } else if (command === 'delete' || command === '3') {
        deleteData(arg, list);
      } else if (command === 'update' || command === '2') {
        updateData(arg, list);
      } else if (command === 'mark-in-prog' || command === '4') {
        markInProg(arg, list);
      } else if (command === 'mark-done' || command === '5') {
        markDone(arg, list);
      } else if (command === 'list' || command === '6') {
        if (list.length === 0) {
          console.log('List is empty');
        } else {
          for (data of list) {
            console.log(
              `ID : ${data.id},\nDescription : ${data.description},\nStatus : ${data.status}\n`
            );
          }
        }
        rl.prompt();
      } else if (command === 'list-done' || command === '9') {
        const doneList = list.filter((item) => item.status === 'done');
        if (doneList.length !== 0) {
          for (data of doneList) {
            console.log(
              `ID : ${data.id},\nDescription : ${data.description},\nStatus : ${data.status}\n`
            );
          }
        } else {
          console.log('There is no done tasks');
        }
        rl.prompt();
      } else if (command === 'list-todo' || command === '7') {
        const doneList = list.filter((item) => item.status === 'todo');
        if (doneList.length !== 0) {
          for (data of doneList) {
            console.log(
              `ID : ${data.id},\nDescription : ${data.description},\nStatus : ${data.status}\n`
            );
          }
        } else {
          console.log('There is no tasks todo');
        }
        rl.prompt();
      } else if (command === 'list-in-progress' || command === '8') {
        const doneList = list.filter((item) => item.status === 'in progress');
        if (doneList.length !== 0) {
          for (data of doneList) {
            console.log(
              `ID : ${data.id},\nDescription : ${data.description},\nStatus : ${data.status}\n`
            );
          }
        } else {
          console.log('There is no tasks in progress');
        }
        rl.prompt();
      } else if (command === 'exit' || command === '10') {
        rl.close();
      } else {
        console.log('Invalid command');
        rl.prompt();
      }
    });
  });
};

const markDone = (input, list) => {
  if (list.length === 0) {
    console.log('List is empty — nothing to update progress.');
    rl.prompt();
    return;
  }
  const num = parseInt(input);
  let found = false;

  if (isNaN(num)) {
    console.log('Invalid input');
    rl.prompt();
    return;
  }
  const newList = list.map((item) => {
    if (item.id === num) {
      found = true;
      return { ...item, status: 'done', updatedAt: new Date() };
    }
    return item;

    if (!found) {
      console.log(`Item with id ${num} not found`);
      rl.prompt();
      return;
    }

    fs.writeFile(filePath, JSON.stringify(newList, null, 2), (err) => {
      if (err) throw err;
      console.log(`Item with id ${num} updated successfully`);
      rl.prompt();
    });
  });
};

const markInProg = (input, list) => {
  if (list.length === 0) {
    console.log('List is empty — nothing to update progress.');
    rl.prompt();
    return;
  }
  const num = parseInt(input);
  let found = false;

  if (isNaN(num)) {
    console.log('Invalid input');
    rl.prompt();
    return;
  }
  const newList = list.map((item) => {
    if (item.id === num) {
      found = true;
      return { ...item, status: 'in progress', updatedAt: new Date() };
    }
    return item;

    if (!found) {
      console.log(`Item with id ${num} not found`);
      rl.prompt();
      return;
    }

    fs.writeFile(filePath, JSON.stringify(newList, null, 2), (err) => {
      if (err) throw err;
      console.log(`Item with id ${num} updated successfully`);
      rl.prompt();
    });
  });
};

const addData = (input, list) => {
  obj = {
    id: list.length ? list[list.length - 1].id + 1 : 1,
    description: input,
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  fs.writeFile(filePath, JSON.stringify([...list, obj], null, 2), (err) => {
    if (err) throw err;
    console.log(`Data added successfully with id: ${obj.id}`);
    rl.prompt();
  });
};

const updateData = (input, list) => {
  if (list.length === 0) {
    console.log('List is empty — nothing to update.');
    rl.prompt();
    return;
  }
  const [number, ...update] = input.trim().split(' ');
  const description = update.join(' ');
  const num = parseInt(number);
  let found = false;

  if (isNaN(num)) {
    console.log('Invalid input');
    rl.prompt();
    return;
  }
  const newList = list.map((item) => {
    if (item.id === num) {
      found = true;
      return { ...item, description, updatedAt: new Date() };
    }
    return item;

    if (!found) {
      console.log(`Item with id ${num} not found`);
      rl.prompt();
      return;
    }

    fs.writeFile(filePath, JSON.stringify(newList, null, 2), (err) => {
      if (err) throw err;
      console.log(`Item with id ${num} updated successfully`);
      rl.prompt();
    });
  });
};

const deleteData = (input, list) => {
  const num = parseInt(input);
  if (isNaN(num)) {
    console.log('Invalid input');
    rl.prompt();
    return;
  } else if (list.length === 0) {
    console.log('List is empty — nothing to delete.');
    rl.prompt();
    return;
  }
  newList = list.filter((item) => item.id !== num);

  list.length === newList.length
    ? console.log(`Item with id ${num} not found`)
    : console.log(`Item with id ${num} deleted successfully`);

  fs.writeFile(filePath, JSON.stringify(newList, null, 2), (err) => {
    if (err) throw err;
    rl.prompt();
  });
};

fileChecking();

process.on('uncaughtException', (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});
