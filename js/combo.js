import {
  getItem,
  setItem,
  getTemplStar,
  getDataFromJSON,
  loading,
  updateAll,
  coverStringToFormat,
} from './untilities.js';

var now = new Date();
var end = now.getTime() + 5 * 24 * 60 * 60 * 1000;
var timeSale = (end - now.getTime()) / 1000;
var dateTime = document.querySelectorAll('.date-time');
var hourTime = document.querySelectorAll('.hour-time');
var minuteTime = document.querySelectorAll('.minute-time');
var secondTime = document.querySelectorAll('.second-time');
setInterval(() => {
  timeSale--;
  var day = Math.floor(timeSale / (24 * 60 * 60));
  var hour = Math.floor((timeSale / 60 / 60) % 24);
  var minute = Math.floor((timeSale / 60) % 60);
  var second = Math.floor(timeSale % 60);
  dateTime.forEach((item) => {
    displayTime(item, day);
  });
  hourTime.forEach((item) => {
    displayTime(item, hour);
  });
  minuteTime.forEach((item) => {
    displayTime(item, minute);
  });
  secondTime.forEach((item) => {
    displayTime(item, second);
  });
}, 1000);

function displayTime(item, value) {
  if (value < 10) {
    item.textContent = '0' + value;
  } else item.textContent = value;
}

// Các thông tin cần hiển thị
var comboName = document.querySelector('#combo-name');
var teacherAvatar = document.querySelector('.teacher-avatar img');
var teacherAvatar2 = document.querySelector('.teacher-avatar-2 img');
var comboCount = document.querySelector('#combo-course');
var comboStudent = document.querySelector('#combo-student');
var comboRating = document.querySelector('#combo-rating');
var teacherName = document.querySelector('.teacher-name span');
var teacherName2 = document.querySelector('.teacher-name-2');
var comboLesson = document.querySelector('#combo-lesson');
var comboTime = document.querySelector('#combo-time');
var comboPercent = document.querySelector('#combo-percent');
var comboPercent2 = document.querySelector('#combo-percent-2');
var combolOldPrice = document.querySelector('.price-old');
var comboSalePrice = document.querySelector('#price-sale');

function getIdCombo() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('combo');
  return value;
}

async function renderCombo() {
  var data = await getDataFromJSON('./data/combo.JSON');
  data.some((item) => {
    if (item.id == getIdCombo()) {
      let percent = Math.floor(
        ((item.price_old - item.price_sale) * 100) / item.price_old
      ).toFixed(0);
      comboName.textContent = item.name;
      teacherAvatar.src = item.teacher_avatar;
      teacherAvatar2.src = item.teacher_avatar;
      comboCount.textContent = item.number_course;
      comboStudent.textContent = item.student;
      comboRating.textContent = item.star.toFixed(1);
      teacherName.textContent = item.teacher;
      teacherName2.textContent = item.teacher;
      comboLesson.textContent = item.number_lesson;
      comboTime.textContent = item.time[0];
      comboPercent.textContent = percent + '%';
      comboPercent2.textContent = `-${percent}%`;
      combolOldPrice.textContent = item.price_old + '$';
      comboSalePrice.textContent = item.price_sale + '$';
      buyNow.forEach((ele) => {
        ele.href = item.combo_link;
      });
      return true;
    }
  });
}
renderCombo();

// Buy Now
var login = getItem('login');
var buyNow = document.querySelectorAll('.button-buy-now');
buyNow.forEach((item) => {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    if (login == false) {
      window.open('./signin.html', '_self');
    } else {
      window.open(`${e.target.href}`, '_self');
    }
  });
});
