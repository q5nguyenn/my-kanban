import { setItem, getItem } from './utility.js';
export { tasks_reset };

const tasks_reset = [
  {
    id: 1,
    name: 'Học HTML',
    description: 'Học trên W3school',
    status: 'todo',
  },
  {
    id: 2,
    name: 'Học CSS',
    description: 'Học trên W3school',
    status: 'todo',
  },
  {
    id: 3,
    name: 'Học NodeJS',
    description: 'Tìm trên Youtube',
    status: 'inprogress',
  },
  {
    id: 4,
    name: 'Học ASP.NET',
    description: 'Có thể là trên youtube',
    status: 'inprogress',
  },
  {
    id: 5,
    name: 'Project ASP.NET',
    description: 'Làm một Mini Project trước khi dính skin',
    status: 'inreview',
  },
  {
    id: 6,
    name: 'App xem sim số đẹp',
    description: 'Xem sim số đẹp đang hoàn thiện',
    status: 'inreview',
  },
  {
    id: 7,
    name: 'App My CV',
    description: 'Sử dụng Local storage lưu dữ liệu',
    status: 'done',
  },
  {
    id: 8,
    name: 'Starclasses',
    description: 'Back end sử dụng Laravel 10.x',
    status: 'done',
  },
];

var tasks = getItem('tasks');

if (tasks == null) {
  setItem('tasks', tasks_reset);
}

const linear_gradient = [
  'linear-gradient(227deg, rgb(81, 255, 234) 0%, rgb(34, 186, 250) 100%)',
  'linear-gradient(225deg, rgb(255, 207, 80) 0%, rgb(255, 115, 52) 100%)',
  'linear-gradient(239deg, rgb(252, 71, 96) 0%, rgb(255, 103, 195) 100%)',
  'linear-gradient(316deg, rgb(75, 161, 252) 3%, rgb(236, 42, 237) 100%)',
];

const randomIndex = Math.floor(Math.random() * linear_gradient.length);
const randomGradient = linear_gradient[randomIndex];

$('body').css('--linear-gradient', randomGradient);
