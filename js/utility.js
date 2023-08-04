export { setItem, getItem, generateNewId, formatDate, pageReload, debounce, generateHtmlString };

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

function generateHtmlString(work) {
  return `<div class="bg-white border mb-2 p-2 rounded position-relative task-item" style="cursor: pointer; min-height:66px"
						data-id="${work['id']}">
						<div class="fw-bold">${work['name']}</div>
						<div>${work['description']}</div>
						<div class="work-menu position-absolute top-0 end-0 d-flex">
							<span class="icon rounded icon-todo" data-id="${work['id']}"><i class="bi bi-card-checklist"></i></span>
							<span class="icon rounded icon-progress" data-id="${work['id']}"><i class="bi bi-card-heading"></i></span>
							<span class="icon rounded icon-review" data-id="${work['id']}"><i class="bi bi-eye"></i></span>
							<span class="icon rounded icon-done" data-id="${work['id']}"><i class="bi bi-check-square"></i></span>
							<span class="icon rounded icon-edit" data-bs-toggle="modal" data-bs-target="#myModal" data-id="${work['id']}"><i class="bi bi-pencil"></i></span>
							<span class="icon rounded icon-close" data-id="${work['id']}"><i class="bi bi-x-lg"></i></span>
						</div>
					</div>`;
}
