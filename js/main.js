import {
  getItem,
  generateHtmlString,
  generateNewId,
  setItem,
  pageReload,
  showNewTask,
  showEditTask,
  hideTask,
} from './utility.js';

let tasks = getItem('tasks');
let htmlTodo = '';
let htmlInProgress = '';
let htmlInReview = '';
let htmlDone = '';
let id = 0;
let index = 0;
let status = 'todo';
let handle = 'add';
let task = [];
tasks.forEach((task) => {
  switch (task['status']) {
    case 'todo':
      htmlTodo += generateHtmlString(task);
      break;
    case 'inprogress':
      htmlInProgress += generateHtmlString(task);
      break;
    case 'inreview':
      htmlInReview += generateHtmlString(task);
      break;
    case 'done':
      htmlDone += generateHtmlString(task);
      break;
    default:
      break;
  }
});

$('.todo-body').html(htmlTodo);
$('.inprogress-body').html(htmlInProgress);
$('.inreview-body').html(htmlInReview);
$('.done-body').html(htmlDone);

$('#handle-task').submit(function (e) {
  e.preventDefault();
  let name = $('#name').val();
  let description = $('#description').val();
  let tasks = getItem('tasks');
  if (handle == 'add') {
    id = generateNewId(tasks);
    task = {
      id: id,
      name: name,
      description: description,
      status: status,
    };
    tasks.push(task);
    showNewTask(task);
  } else {
    tasks[index]['name'] = name;
    task['name'] = name;
    tasks[index]['description'] = description;
    task['description'] = description;
    showEditTask(task);
  }
  hideInput();
  setItem('tasks', tasks);
});

$(document).on('click', '.icon-close', function (e) {
  e.preventDefault();
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      let id = $(this).data('id');
      let tasks = getItem('tasks');
      tasks = tasks.filter((element) => {
        return element['id'] != id;
      });
      setItem('tasks', tasks);
      location.reload();
    }
  });
});

// Thêm task
$('.task-header').click(function (e) {
  e.preventDefault();
  handle = 'add';
  status = $(this).data('status');
  showInput();
});

// Edit task
$(document).on('click', '.task-item', function (e) {
  if (!$(e.target).closest('.task-menu').length) {
    let tasks = getItem('tasks');
    id = $(this).data('id');
    index = tasks.findIndex((element) => element['id'] == id);
    task = tasks[index];
    $('#name').val(task['name']);
    $('#description').val(task['description']);
    handle = 'edit';
    showInput();
  }
});

// Hàm dùng chung
function showInput() {
  if (handle == 'add') {
    $('input').val('');
  }
  $('.modal').fadeIn(300);
  $('.modal-backdrop').fadeIn(300);
  $('#name').focus();
}

function hideInput() {
  $('.modal').fadeOut(300);
  $('.modal-backdrop').fadeOut(300);
}

$('.cancel-input').click(function (e) {
  hideInput();
});

$('.modal').click(function (e) {
  if (!$(e.target).closest('.modal-dialog').length) {
    hideInput();
  }
});

$(document).on('click', '.icon-todo', function (e) {
  id = $(this).data('id');
  tasks = getItem('tasks');
  index = tasks.findIndex((element) => element['id'] == id);
  task = tasks[index];
  hideTask(task);
  id = generateNewId(tasks);
  tasks[index]['status'] = 'todo';
  tasks[index]['id'] = id;
  task['status'] = 'todo';
  task['id'] = id;
  showNewTask(task);
  setItem('tasks', tasks);
});

$(document).on('click', '.icon-progress', function (e) {
  id = $(this).data('id');
  tasks = getItem('tasks');
  index = tasks.findIndex((element) => element['id'] == id);
  task = tasks[index];
  hideTask(task);
  id = generateNewId(tasks);
  tasks[index]['status'] = 'inprogress';
  tasks[index]['id'] = id;
  task['status'] = 'inprogress';
  task['id'] = id;
  showNewTask(task);
  setItem('tasks', tasks);
});

$(document).on('click', '.icon-review', function (e) {
  id = $(this).data('id');
  tasks = getItem('tasks');
  index = tasks.findIndex((element) => element['id'] == id);
  task = tasks[index];
  hideTask(task);
  id = generateNewId(tasks);
  tasks[index]['status'] = 'inreview';
  tasks[index]['id'] = id;
  task['status'] = 'inreview';
  task['id'] = id;
  showNewTask(task);
  setItem('tasks', tasks);
});

$(document).on('click', '.icon-done', function (e) {
  id = $(this).data('id');
  tasks = getItem('tasks');
  index = tasks.findIndex((element) => element['id'] == id);
  task = tasks[index];
  hideTask(task);
  id = generateNewId(tasks);
  tasks[index]['status'] = 'done';
  tasks[index]['id'] = id;
  task['status'] = 'done';
  task['id'] = id;
  showNewTask(task);
  setItem('tasks', tasks);
});
