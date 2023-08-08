import { getItem } from './untilities.js';

var login = getItem('login');
var btnBecomeTeacher = document.querySelectorAll('.button-b-teacher');
btnBecomeTeacher.forEach((item) => {
  item.addEventListener('click', function () {
    if (login == false) {
      window.open('./signin.html', '_self');
    } else {
      window.open('./index.html', '_self');
    }
  });
});
