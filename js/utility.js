export {
  setItem,
  getItem,
  generateNewId,
  formatDate,
  pageReload,
  debounce,
  generateHtmlString,
  showNewTask,
  showEditTask,
  hideTask,
};

function setItem(item, value) {
  localStorage.setItem(item, JSON.stringify(value));
}

function getItem(item) {
  return JSON.parse(localStorage.getItem(item));
}

function generateNewId(arr) {
  let newId = 1;
  while (arr.find((item) => item.id === newId)) {
    newId++;
  }
  return newId;
}

function formatDate(dateString, format = 'simple') {
  if (!dateString) {
    return '02/1998';
  }
  let [year, month, day] = dateString.split('-');
  if (format == 'simple') {
    let formattedDate = `${month}/${year}`;
    return formattedDate;
  } else {
    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}

function pageReload() {
  const scrollPosition = localStorage.getItem('scrollPosition');

  if (scrollPosition) {
    $(window).scrollTop(parseInt(scrollPosition));
  }

  $(window).scroll(function () {
    const currentScroll = $(this).scrollTop();
    localStorage.setItem('scrollPosition', currentScroll);
  });
}

// Debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function generateHtmlString(task) {
  return `<div class="bg-white border mb-2 p-2 rounded position-relative task-item" style="cursor: pointer; min-height:66px"
						data-id="${task['id']}">
						<div class="fw-bold task-name">${task['name']}</div>
						<div class="task-description">${task['description']}</div>
						<div class="task-menu position-absolute top-0 end-0 d-flex">
							<span class="icon rounded icon-todo" data-id="${task['id']}"><i class="bi bi-card-checklist"></i></span>
							<span class="icon rounded icon-progress" data-id="${task['id']}"><i class="bi bi-card-heading"></i></span>
							<span class="icon rounded icon-review" data-id="${task['id']}"><i class="bi bi-eye"></i></span>
							<span class="icon rounded icon-done" data-id="${task['id']}"><i class="bi bi-check-square"></i></span>
							<span class="icon rounded icon-close" data-id="${task['id']}"><i class="bi bi-x-lg"></i></span>
						</div>
					</div>`;
}

function showNewTask(task) {
  let id = task['id'];
  let status = task['status'];
  let temp = `div.task-item[data-id="${id}"]`;
  let htmlResult = `<div class="bg-white border mb-2 p-2 rounded position-relative task-item" style="cursor: pointer; 
											min-height:66px; display:none" data-id="${task['id']}">
											<div class="fw-bold task-name">${task['name']}</div>
											<div class="task-description">${task['description']}</div>
											<div class="task-menu position-absolute top-0 end-0 d-flex">
												<span class="icon rounded icon-todo" data-id="${task['id']}"><i class="bi bi-card-checklist"></i></span>
												<span class="icon rounded icon-progress" data-id="${task['id']}"><i class="bi bi-card-heading"></i></span>
												<span class="icon rounded icon-review" data-id="${task['id']}"><i class="bi bi-eye"></i></span>
												<span class="icon rounded icon-done" data-id="${task['id']}"><i class="bi bi-check-square"></i></span>
												<span class="icon rounded icon-close" data-id="${task['id']}"><i class="bi bi-x-lg"></i></span>
											</div>
										</div>`;
  switch (status) {
    case 'todo':
      $('.todo-body').append(htmlResult);
      break;
    case 'inprogress':
      $('.inprogress-body').append(htmlResult);
      break;
    case 'inreview':
      $('.inreview-body').append(htmlResult);
      break;
    case 'done':
      $('.done-body').append(htmlResult);
      break;
    default:
      break;
  }
  $(temp).fadeIn(300);
}

function showEditTask(task) {
  let id = task['id'];
  let temp = `div.task-item[data-id="${id}"]`;
  $(temp).find('.task-name').text(task['name']);
  $(temp).find('.task-description').html(task['description']);
}

function hideTask(task) {
  let id = task['id'];
  let temp = `div.task-item[data-id="${id}"]`;
  $(temp).fadeOut(300);
  $(temp).remove();
}
