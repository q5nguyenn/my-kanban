import { getItem, generateHtmlString, generateNewId, setItem, pageReload } from './utility.js';

let works = getItem('works');
let htmlTodo = '';
let htmlInProgress = '';
let htmlInReview = '';
let htmlDone = '';
let index = 0;
let status = 'todo';
let handle = 'add';
let work = [];
works.forEach((work) => {
  switch (work['status']) {
    case 'todo':
      htmlTodo += generateHtmlString(work);
      break;
    case 'inprogress':
      htmlInProgress += generateHtmlString(work);
      break;
    case 'inreview':
      htmlInReview += generateHtmlString(work);
      break;
    case 'done':
      htmlDone += generateHtmlString(work);
      break;
    default:
      break;
  }
});

$('.todo-body').html(htmlTodo);
$('.inprogress-body').html(htmlInProgress);
$('.inreview-body').html(htmlInReview);
$('.done-body').html(htmlDone);

$('.add-work').click(function (e) {
  e.preventDefault();
  status = $(this).data('status');
});

$('#handle-work').submit(function (e) {
  // e.preventDefault();
  let name = $('#name').val();
  let description = $('#description').val();
  let works = getItem('works');
  if (handle == 'add') {
    let id = generateNewId(works);
    let work = {
      id: id,
      name: name,
      description: description,
      status: status,
    };
    works.push(work);
  } else {
    works[index]['name'] = name;
    works[index]['description'] = description;
  }
  setItem('works', works);
});

$('.icon-close').click(function (e) {
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
      let works = getItem('works');
      works = works.filter((element) => {
        return element['id'] != id;
      });
      setItem('works', works);
      location.reload();
    }
  });
});

$('.icon-edit').click(function (e) {
  let id = $(this).data('id');
  let works = getItem('works');
  index = works.findIndex((element) => element['id'] == id);
  work = works[index];
  $('#name').val(work['name']);
  $('#description').val(work['description']);
  handle = 'edit';
});

$('.task-item').dblclick(function (e) {
  console.log('double');
  e.preventDefault();
});
