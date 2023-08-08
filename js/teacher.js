import {
  getItem,
  setItem,
  getTemplStar,
  getDataFromJSON,
  loading,
  updateAll,
  coverStringToFormat,
} from './untilities.js';

function getIdCourse() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('id');
  return value;
}

// Các thông tin cần hiển thị
var teacherName = document.querySelector('.teacher-name');
var teacherAvatar = document.querySelector('.teacher-avatar img');
var teacherJob = document.querySelector('.teacher-job');
var teacherNameInner = document.querySelectorAll('.teacher-name-inner');

async function renderInfoTeacher() {
  var arr = await getDataFromJSON('./data/subjects.JSON');
  arr.forEach((item) => {
    if (item.id == getIdCourse()) {
      teacherName.textContent = item.teacher;
      teacherAvatar.src = item.teacher_avatar;
      teacherJob.innerHTML = `Teacher at: <b>${item.section}</b>`;
      teacherNameInner.forEach((ele) => {
        ele.textContent = item.teacher;
      });
    }
  });
}

renderInfoTeacher();

async function getTeacherName() {
  var arr = await getDataFromJSON('./data/subjects.JSON');
  var teacher = '';
  arr.forEach((item) => {
    if (item.id == getIdCourse()) {
      teacher = item.teacher;
    }
  });
  return teacher;
}

// Xuất ra các khoá học của giảng viên
async function getSubjectFromTeacher() {
  var data = await getDataFromJSON('./data/subjects.JSON');
  var teacher = await getTeacherName();
  var arr = [];
  data.forEach((item) => {
    if (item.teacher == teacher) {
      arr.push(item);
    }
  });
  return arr;
}

// Render ra các khoá học của giảng viên

var teacherCourse = document.querySelector('.teacher-course');
var numberCourse = document.querySelector('.number-course');
var numberStudent = document.querySelector('.number-student');
var starRate = document.querySelector('.star-rate');
async function renderAllCourseFromTeacher() {
  var temp = '';
  var data = await getSubjectFromTeacher();
  var student = 0;
  var rate = 0;

  data.forEach((item) => {
    student += item.student;
    rate += item.star;
    let percent = Math.floor(
      ((item.price_old - item.price_sale) / item.price_old) * 100
    );
    let numberLesson =
      item.number_lesson < 10 ? '0' + item.number_lesson : item.number_lesson;
    let hour = item.time[0] < 10 ? '0' + item.time[0] : item.tim[0];
    let minute = item.time[1] < 10 ? '0' + item.time[1] : item.time[1];
    temp += `<a class="teacher-box-item" href="./course.html?id=${item.id}">
              <div class="teacher-box-item-img">
                <img src="${item.cover}" alt="" />
              </div>
              <div class="teacher-box-item-course">
                <div class="teacher-box-item-course-name">${item.name}</div>
                <div class="teacher-box-item-course-info">
                  <span><i class="bi bi-list-stars"></i> ${numberLesson} Lessons</span>
                  <span><i class="bi bi-clock"></i> ${hour} hours ${minute} minutes</span>
                </div>
                <p class="teacher-box-item-course-desc">
                  <i class="bi bi-check-lg"></i> Understand the basics of ${item.subject}
                </p>
                <p class="teacher-box-item-course-desc">
                  <i class="bi bi-check-lg"></i> Knowledge about ${item.subject} is enhanced
                </p>
                <p class="teacher-box-item-course-desc">
                  <i class="bi bi-check-lg"></i> Apply ${item.subject} knowledge into practice
                </p>
              </div>
              <div class="teacher-box-item-cost">
                <div class="teacher-box-item-sale">${item.price_sale}$</div>
                <div class="teacher-box-item-old">${item.price_old}$</div>
                <div class="teacher-box-item-off">(OFF ${percent}%)</div>
                <button class="button-fa">Detail</button>
              </div>
            </a>`;
  });
  numberCourse.textContent = data.length < 10 ? '0' + data.length : data.length;
  numberStudent.textContent = student;
  starRate.textContent = (rate / data.length).toFixed(1);
  teacherCourse.innerHTML = temp;
}

renderAllCourseFromTeacher();
