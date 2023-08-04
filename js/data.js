import { setItem, getItem } from './utility.js';
export { works_reset };

const works_reset = [
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

var works = getItem('works');

if (works == null) {
  setItem('works', works_reset);
}
