const tasks = document.querySelector('.tasks');
const form = document.querySelector('.task-tracker');
const input = document.querySelector('.type-box');

let taskList = JSON.parse(localStorage.getItem('task')) || [];

renderTasks(taskList, tasks);

function renderTasks(taskList = [], tasks) {
  tasks.innerHTML = taskList
    .sort((a, b) => a.completed - b.completed)
    .map(
      (tsk, i) =>
        `<li><input type="checkbox" class='cursor' data-index=${i} ${
          tsk.completed ? 'checked' : ''
        }>
      <label class=${tsk.completed ? 'checked' : ''}>${tsk.text}</label>
      <p class='float_right' data-index=${i}>🗑️</p></li>`
    )
    .join('');
}

function taskSubmit(e) {
  e.preventDefault();
  if (input.value) {
    const item = {
      text: input.value.trim(),
      completed: false,
    };
    taskList.push(item);
    localStorage.setItem('task', JSON.stringify(taskList));
    renderTasks(taskList, tasks);
    form.reset();
  }
}

function toggleDeleteTask(e) {
  if (e.target.type === 'checkbox') {
    const index = e.target.dataset.index;
    taskList[index].completed = e.target.checked;
    localStorage.setItem('task', JSON.stringify(taskList));
    renderTasks(taskList, tasks);
  }
  if (e.target.classList.contains('float_right')) {
    const index = e.target.dataset.index;
    taskList.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(taskList));
    renderTasks(taskList, tasks);
  }
}

form.addEventListener('submit', taskSubmit);
tasks.addEventListener('click', toggleDeleteTask);
