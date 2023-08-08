import {
  getItem,
  setItem,
  getTemplStar,
  getDataFromJSON,
  loading,
  updateAll,
  coverStringToFormat,
} from './untilities.js';

// Click Show Hide Course List
var deg = 0;
var courseItems = document.querySelectorAll('.course-content-item-title');
courseItems.forEach((item) => {
  item.addEventListener('click', function () {
    item.nextElementSibling.classList.toggle('course-content-hide');
    item.nextElementSibling.classList.toggle('course-content-show');
    if (item.firstElementChild.classList.contains('rotate')) {
      item.firstElementChild.style.animation = 'unset';
      item.firstElementChild.style.animation =
        'rotate-left 0.1s ease-in-out both';
    } else {
      item.firstElementChild.style.animation = 'unset';
      item.firstElementChild.style.animation =
        'rotate-right 0.1s ease-in-out both';
    }
    if (deg == 0) deg = 180;
    if (deg == 180) deg = 0;
    item.firstElementChild.classList.toggle('rotate');
  });
});

// Show hide Video
var videoLinks = document.querySelectorAll('.count-content-video');
var video = document.querySelector('.video');
var videoBlur = document.querySelector('.video-blur');
var popupNewStudent = document.querySelector('.new-student');
var navs = document.querySelector('.navs');

// Show
videoLinks.forEach((item) => {
  item.addEventListener('click', function () {
    video.style.animation =
      'slide-in-top-video .5s cubic-bezier(.25,.46,.45,.94) both';
    videoBlur.style.animation =
      'fade-in .5s cubic-bezier(.39,.575,.565,1.000) both';
    videoBlur.style.display = 'block';
    popupNewStudent.style.display = 'none';
    navs.style.display = 'none';
  });
});

// Hide
videoBlur.addEventListener('click', function () {
  video.style.animation =
    'slide-out-top-video .5s cubic-bezier(.25,.46,.45,.94) both';
  videoBlur.style.animation = 'fade-out .5s ease-out both';
  setTimeout(() => {
    videoBlur.style.display = 'none';
    popupNewStudent.style.display = 'flex';
    navs.style.display = 'flex';
  }, 300);
});

// Show Popup Position
var courseCover = document.querySelector('.course-cover');
var popupCourse = document.querySelector('.course-popup-container');
var popupCourseOffsetLeft =
  courseCover.offsetLeft +
  courseCover.clientWidth +
  (5 * (courseCover.clientWidth / 65) * 100) / 100;

var header = document.querySelector('.navs');
var heightNav = header.offsetHeight;
var footer = document.querySelector('footer');

window.addEventListener('scroll', function (e) {
  if (window.pageYOffset >= heightNav) {
    if (window.innerWidth < 767) {
      popupCourse.style.bottom = '0';
      popupCourse.style.top = 'unset';
    } else {
      popupCourse.style.bottom = 'unset';
      popupCourse.style.top = '50px';
    }
  } else {
    if (window.innerWidth < 767) {
      popupCourse.style.bottom = '0';
      popupCourse.style.top = 'unset';
    } else {
      popupCourse.style.bottom = 'unset';
      popupCourse.style.top = '70px';
    }
  }
});
if (window.innerWidth > 767) {
  popupCourse.style.left = popupCourseOffsetLeft + 'px';
  popupCourse.style.width =
    (30 * (courseCover.clientWidth / 65) * 100) / 100 + 'px';
  window.addEventListener('scroll', function (e) {
    var popUpoffSetBottom =
      window.pageYOffset + window.innerHeight - footer.offsetTop;
    if (popUpoffSetBottom > 0) {
      popupCourse.style.top = 'unset';
      popupCourse.style.bottom = popUpoffSetBottom + 20 + 'px';
    }
  });
}
if (window.innerWidth < 767) {
  popupCourse.style.left = 0;
  popupCourse.style.width = '100%';
  popupCourse.style.bottom = 0;
  popupCourse.style.top = 'unset';
}

// Hiển thị thông tin dựa vào Value
// Get SearchValue
function getIdCourse() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('id');
  return value;
}

//=>Thông tin cần thay
var section = document.querySelector('#section');
var subject = document.querySelector('#subject');
var courseName = document.querySelector('.course-name');
var courseDesc = document.querySelector('.course-desc');
var courseTeacherAvatar = document.querySelector('.course-teacher-avatar img');
var courseTeacherName = document.querySelector('.course-teacher-name');
var courseRate = document.querySelector('#rate');
var courseStudent = document.querySelector('#student');
var courseStarDisplay = document.querySelector('#course-star-display');
var courseSalePrice = document.querySelector('.course-popup-nowprice');
var courseOldPrice = document.querySelector('.course-popup-oldprice');
var courseSalePercent = document.querySelector('.course-popup-percent-price');
// sửa cái này
var courseTime = document.querySelectorAll('.course-time');
var courseNumberSection = document.querySelectorAll('.course-number-section');

// render Chi tiết môn học
async function getSubjects(id) {
  var data = await await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (id == item.id) {
      section.textContent = item.section;
      section.href = `./tag-section.html?section=${coverStringToFormat(
        item.section
      )}`;
      subject.textContent = item.subject;
      subject.href = `./tag-subject.html?section=${coverStringToFormat(
        item.section
      )}&subject=${coverStringToFormat(item.subject)}`;
      let numberLesson =
        item.number_lesson < 10 ? '0' + item.number_lesson : item.number_lesson;
      let hour = item.time[0] < 10 ? '0' + item.time[0] : item.time[0];
      let minute = item.time[1] < 10 ? '0' + item.time[1] : item.time[1];
      courseName.textContent = item.name;
      courseDesc.textContent = item.desc;
      courseTeacherAvatar.src = item.teacher_avatar;
      courseTeacherName.textContent = item.teacher;
      courseRate.textContent = item.star.toFixed(1) + ' Rating';
      courseStudent.textContent = item.student + ' Students';
      courseStarDisplay.innerHTML = getTemplStar(item.star);
      courseSalePrice.textContent = '$' + item.price_sale;
      courseOldPrice.textContent = '$' + item.price_old;
      courseSalePercent.textContent = `(-${Math.floor(
        ((item.price_old - item.price_sale) / item.price_old) * 100
      )}% OFF)`;
      courseTime[0].textContent = `Total time ${hour} hours ${minute} minutes`;
      courseTime[1].textContent = `${hour} hours on-demand video`;
      courseNumberSection.forEach((item) => {
        item.textContent = `${numberLesson} sections`;
      });
      // courseNumberSection.textContent = `${numberLesson} sections`;
    }
  });
}

getSubjects(getIdCourse());

// Render Comment
var commentsWrapper = document.querySelector('.course-comment-wrapper');
var moreComment = document.querySelector('#get-more-comment');
async function renderComments(number) {
  var data = await getDataFromJSON('./data/comments.JSON');
  let tempComment = '';
  if (number > data.length) {
    number = data.length;
    moreComment.innerHTML = "That's all";
  }
  data.forEach((item, index) => {
    if (index < number) {
      tempComment += `<div class="course-comment-item">
                      <div class="course-comment-item-top">
                        <div class="course-comment-avatar">
                          <img src="${item.avatar}" alt="" />
                        </div>
                        <div class="course-comment-rate">
                          <div class="course-comment-name">${item.name}</div>
                          <div class="course-commnet-rate-star">
                            <span class="course-star">
                              ${getTemplStar(item.star)}
                            </span>
                            <span>${item.time}</span>
                          </div>
                        </div>
                        <div class="course-comment-report">
                          <a class="course-comment-report-popup">
                          Report
                          </a>
                          <i class="bi bi-three-dots-vertical"></i>
                        </div>
                      </div>
                      <div class="course-comment-content">
                      ${item.comment}</div>
                      <div class="course-commnet-like">
                        <span>Helpful?</span>
                        <span>
                          <i class="bi bi-hand-thumbs-up"> </i>
                          <i class="bi bi-hand-thumbs-down"></i>
                        </span>
                      </div>
                    </div>`;
    }
  });
  commentsWrapper.insertAdjacentHTML('beforeend', tempComment);
}

var numberComment = 2;
renderComments(numberComment);
moreComment.addEventListener('click', function () {
  moreComment.innerHTML = `<div class="loading-chat">
  <div>
  <span></span>
  <span></span>
  <span></span>
  </div>
  </div>`;
  setTimeout(() => {
    numberComment += 2;
    renderComments(numberComment);
    window.scrollTo(0, moreComment.offsetTop - window.innerHeight + 50);
    moreComment.innerHTML = 'Show more';
  }, 500);
});

// Write A comment
var allStarRate = document.querySelectorAll('#course-star-rate i');
var starRate = 1;
allStarRate.forEach((item, index) => {
  item.addEventListener('click', function () {
    starRate = index + 1;
    allStarRate.forEach((star) => {
      star.className = 'bi bi-star';
    });
    allStarRate.forEach((item2, i) => {
      if (i <= index) {
        item2.className = 'bi bi-star-fill';
      }
    });
  });
});

var userComment = document.querySelector('#user-commnent');
var sentCommnent = document.querySelector('#send-user-comment');
sentCommnent.addEventListener('click', function () {
  if (userComment.value == '' || userComment.value.length < 10) {
    userComment.nextElementSibling.style.visibility = 'visible';
  } else {
    userComment.nextElementSibling.style.visibility = 'hidden';
    var user = getItem('user');
    let name = user.fullname || user.name;
    let tempComment = `<div class="course-comment-item">
                      <div class="course-comment-item-top">
                        <div class="course-comment-avatar">
                          <img src="${user.avatar}" alt="" />
                        </div>
                        <div class="course-comment-rate">
                          <div class="course-comment-name">${name}</div>
                          <div class="course-commnet-rate-star">
                            <span class="course-star">
                              ${getTemplStar(starRate)}
                            </span>
                            <span>Now</span>
                          </div>
                        </div>
                        <div class="course-comment-report">
                          <a class="course-comment-report-popup">
                          Report
                          </a>
                          <i class="bi bi-three-dots-vertical"></i>
                        </div>
                      </div>
                      <div class="course-comment-content">
                      ${userComment.value}</div>
                      <div class="course-commnet-like">
                        <span>Helpful?</span>
                        <span>
                          <i class="bi bi-hand-thumbs-up"></i>
                          <i class="bi bi-hand-thumbs-down"></i>
                        </span>
                      </div>
                    </div>`;
    commentsWrapper.insertAdjacentHTML('afterbegin', tempComment);
    userComment.value = '';
  }
});

// Like hoặc Dislike và Report
commentsWrapper.addEventListener('click', function (e) {
  if (e.target.matches('.bi-hand-thumbs-up')) {
    e.target.className = 'bi bi-hand-thumbs-up-fill';
    if (
      e.target.nextElementSibling.classList.contains('bi-hand-thumbs-down-fill')
    ) {
      e.target.nextElementSibling.className = 'bi bi-hand-thumbs-down';
    }
  } else if (e.target.matches('.bi-hand-thumbs-down')) {
    e.target.className = 'bi bi-hand-thumbs-down-fill';
    if (
      e.target.previousElementSibling.classList.contains(
        'bi-hand-thumbs-up-fill'
      )
    ) {
      e.target.previousElementSibling.className = 'bi bi-hand-thumbs-up';
    }
  } else if (e.target.matches('.bi-hand-thumbs-down-fill')) {
    e.target.className = 'bi bi-hand-thumbs-down';
  } else if (e.target.matches('.bi-hand-thumbs-up-fill')) {
    e.target.className = 'bi bi-hand-thumbs-up';
  }
  if (e.target.matches('.course-comment-report')) {
    var reportShow = document.querySelector('.show');
    if (reportShow) {
      reportShow.classList.remove('show');
    } else {
      e.target.firstElementChild.classList.toggle('show');
    }
  }
  if (e.target.matches('.course-comment-report-popup')) {
    loading();
    setTimeout(() => {
      e.target.classList.remove('show');
    }, 500);
  }
});

// Không đăng nhập thì ẩn cái gì
var courseCommentUser = document.querySelector('.course-comment-user');
var login = getItem('login');
if (login == true) {
  courseCommentUser.style.display = 'block';
}

// Thêm vật phẩm vào giỏ hàng
var addCourse = document.querySelector('#add-course');
var cartCourseCount = document.querySelector('#cart-course');
var cartCourseCountMobile = document.querySelector('#cart-course-mobile');
var popUpAddCartSuccess = document.querySelector('.popup-add-cart-sucess');

addCourse.addEventListener('click', function () {
  if (!login) {
    window.open('./signin.html', '_self');
  } else {
    let user = getItem('user');
    if (user.buy.includes(getValueId())) {
      addCourse.textContent = 'You have already purchased this course';
      return;
    } else if (user.cart.includes(getValueId())) {
      addCourse.textContent = 'The course is already in your cart';
      return;
    } else {
      user.cart.push(getValueId());
      cartCourseCount.style.display = 'flex';
      cartCourseCount.textContent = user.cart.length;
      cartCourseCountMobile.style.display = 'flex';
      cartCourseCountMobile.textContent = user.cart.length;
      setItem('user', user);
      updateAll(user);
      popUpAddCartSuccess.style.display = 'block';
      setTimeout(() => {
        popUpAddCartSuccess.style.display = 'none';
        // location.reload();
      }, 2000);
    }
  }
});

function getValueId() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('id');
  return value;
}

// Mua ngay
var buyNow = document.querySelector('#buy-now');
var courseGift = document.querySelector('.course-gift');
buyNow.addEventListener('click', buyNowOrGift);
courseGift.addEventListener('click', buyNowOrGift);
function buyNowOrGift() {
  if (!login) {
    window.open('./signin.html', '_self');
  } else {
    let user = getItem('user');
    if (user.buy.includes(getValueId())) {
      buyNow.textContent = 'You have already purchased this course';
      return;
    } else {
      window.open(`./payment-now.html?pay=${getValueId()}`, '_self');
    }
  }
}

// Hiển thị nhiều ít - View more
var viewMoreDesc = document.querySelector('.course-content-info-showmore');
viewMoreDesc.addEventListener('click', function () {
  viewMoreDesc.parentElement.classList.toggle('show-view-more');
  if (this.firstElementChild.classList.contains('rotate')) {
    this.firstElementChild.style.animation = 'unset';
    this.firstElementChild.style.animation =
      'rotate-left 0.1s ease-in-out both';
    this.lastElementChild.textContent = 'Show more';
  } else {
    this.firstElementChild.style.animation = 'unset';
    this.firstElementChild.style.animation =
      'rotate-right 0.1s ease-in-out both';
    this.lastElementChild.textContent = 'Show less';
  }
  this.firstElementChild.classList.toggle('rotate');
});

// Like course
var heart = document.querySelector('.course-heart');
heart.addEventListener('click', function () {
  if (!heart.classList.contains('like')) {
    heart.classList.add('like');
    handleAddLikeCourse();
  } else {
    heart.classList.remove('like');
    handleDeleteLikeCourse();
  }
});

function handleAddLikeCourse() {
  if (login) {
    var id = getValueId();
    var user = getItem('user');
    if (!user.like.includes(id)) {
      user.like.push(id);
      setItem('user', user);
      updateAll(user);
    }
  }
}

function handleDeleteLikeCourse() {
  if (login) {
    var id = getValueId();
    var user = getItem('user');
    user.like.forEach((item, index) => {
      if (item == id) {
        user.like.splice(index, 1);
      }
    });
    setItem('user', user);
    updateAll(user);
  }
}

function showLikeCourse() {
  if (login) {
    var id = getValueId();
    var user = getItem('user');
    if (user.like.includes(id)) {
      heart.classList.add('like');
    }
  }
}

showLikeCourse();

// Dẫn đến trang giáo viên
var teacherTitle = document.querySelector('.course-teacher-title');
courseTeacherName.href = `./teacher.html?id=${getIdCourse()}`;
teacherTitle.href = `./teacher.html?id=${getIdCourse()}`;

// Share
var fbButton = document.getElementById('fb-share-button');
fbButton.addEventListener('click', function () {
  var url = window.location.href;
  window.open(
    'https://www.facebook.com/sharer/sharer.php?u=' + url,
    'facebook-share-dialog',
    'width=800,height=600'
  );
  return false;
});

// Mã giảm hàng
var voucher = document.querySelector('#voucher');
voucher.addEventListener('click', function () {
  var login = getItem('login');
  if (login == true) window.open('./profile.html?frame=2', '_self');
  else window.open('./signin.html', '_self');
});

// Render phần còn lại

// Các thông tin cần hiển thị
var teacherName = document.querySelector('.course-teacher-title');
var teacherAvatar = document.querySelector('.course-teacher-img img');
var teacherJob = document.querySelector('.course-teacher-job');

async function renderInfoTeacher() {
  var arr = await getDataFromJSON('./data/subjects.JSON');
  arr.forEach((item) => {
    if (item.id == getIdCourse()) {
      teacherName.textContent = item.teacher;
      teacherAvatar.src = item.teacher_avatar;
      teacherJob.innerHTML = `Teacher at: <b>${item.section}</b>`;
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

// Render ra thêm một số nội dung tiếp của giảng viên
var numberCourse = document.querySelector('.number-course');
var numberStudent = document.querySelector('.number-student');
var starRate = document.querySelector('.star-rate');
var viewRate = document.querySelector('.view-rate');
async function renderAllCourseFromTeacher() {
  var data = await getSubjectFromTeacher();
  var student = 0;
  var rate = 0;
  var viewrate = 0;
  data.forEach((item) => {
    student += item.student;
    rate += item.star;
    let percent = Math.floor(
      ((item.price_old - item.price_sale) / item.price_old) % 100
    );
    viewrate += item.view_rate;
  });
  var courseCount = data.length < 10 ? '0' + data.length : data.length;
  numberCourse.textContent = courseCount + ' Courses';
  numberStudent.textContent = student + ' Students';
  starRate.textContent = (rate / data.length).toFixed(1) + ' Rating';
  viewRate.textContent = viewrate + ' Reviews';
}

renderAllCourseFromTeacher();

// Render ra các khoá học liên quan
async function getSubjectName() {
  var arr = await getDataFromJSON('./data/subjects.JSON');
  var subject = '';
  arr.forEach((item) => {
    if (item.id == getIdCourse()) {
      subject = item.subject;
    }
  });
  return subject;
}

getSubjectName();

// Xuất ra các khoá học liên quan
async function getSubjectRelevant() {
  var data = await getDataFromJSON('./data/subjects.JSON');
  var subject = await getSubjectName();
  var arr = [];
  data.forEach((item) => {
    if (item.subject == subject) {
      arr.push(item);
    }
  });
  return arr;
}
getSubjectRelevant();

// render Các khoá học liên quan
var courseRelevantBox = document.querySelector('.course-relevant-box');
var viewMore = document.querySelector('#view-more');
var number = 2;
async function renderRelevantCourse() {
  var temp = '';
  var data = await getSubjectRelevant();
  if (data.length <= 2) {
    viewMore.innerHTML = '';
    viewMore.style.padding = 0;
  } else if (number > data.length) {
    number = data.length;
    loadViewMore();
    setTimeout(() => {
      viewMore.innerHTML = "That's all";
    }, 500);
  } else loadViewMore();
  data.forEach((item, index) => {
    let hour = item.time[0] < 10 ? '0' + item.time[0] : item.tim[0];
    // let minute = item.time[1] < 10 ? '0' + item.time[1] : item.time[1];
    if (index < number) {
      temp += `<a class="course-relevant-item" href="./course.html?id=${
        item.id
      }">
              <div class="course-relevant-img">
                <img
                  src="${item.cover}"
                  alt=""
                />
              </div>
              <div class="course-relevant-wrapper">
                <div class="course-relevant-info">
                  <div class="course-relevant-name">${item.name}</div>
                  <div class="course-relevant-time">
                    <span>${hour} hours total</span><i class="bi bi-dot"></i>
                    <span>Update ${item.update}</span>
                  </div>
                </div>
                <div class="course-relevant-star">
                  <span>${item.star.toFixed(1)}</span>
                  <span class="course-star">
                    <i class="bi bi-star-fill"></i>
                  </span>
                </div>
                <div class="course-students-count">
                  <i class="bi bi-people-fill"></i>
                  <span>${item.student} Students</span>
                </div>
                <div class="course-relevant-price">
                  <div>${item.price_sale}$</div>
                  <div>${item.price_old}$</div>
                </div>
              </div>
            </a>`;
    }
  });
  setTimeout(() => {
    courseRelevantBox.innerHTML = temp;
  }, 500);
}

renderRelevantCourse();

viewMore.addEventListener('click', function () {
  renderRelevantCourse();
  number += 2;
});

// Fake loadig view more
function loadViewMore() {
  viewMore.innerHTML = `<div class="loading-chat">
                              <div>
                              <span></span>
                              <span></span>
                              <span></span>
                              </div>
                            </div>`;
  setTimeout(() => {
    viewMore.innerHTML = 'Show more';
  }, 500);
}

// Print This Course
var printThisCourse = document.querySelector('.course-print');
printThisCourse.addEventListener('click', handlePrintCoure);

function handlePrintCoure() {
  console.log(1);
  // var divContents = document.body.innerHTML;
  var divContentTop = document.querySelector('.course-wrapper').innerHTML;
  var divContentBody = document.querySelector('.course-intro').innerHTML;
  var divContentBot1 = document.querySelector('.course-content').innerHTML;
  var divContentBot2 = document.querySelector(
    '.course-content-info-print'
  ).innerHTML;
  console.log(divContentBot2);
  // console.log(divContents);
  var a = window.open('', '', 'height=500, width=500');
  a.document.write('<html>');
  a.document.write(
    `<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Star Classes - Print Course</title>
    <link rel="icon" type="image/x-icon" href="./images/x-icon.ico" />
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="stylesheet" href="./css/coursedesc.css" />
    <link rel="stylesheet" href="./css/print.css" />
  </head>`
  );
  a.document.write(
    `<main>
      <div class="course-wrapper">`
  );
  a.document.write(`<div class="print-company">
                      <a href="./index.html" class="logo logo-animation">
                        <div class="logo-inner">
                          <img src="./images/logo.png" alt="" />
                        </div>
                      </a>
                      <div>
                        <div>Company:</div>
                        <div>Address:</div>
                        <div>Tel:</div>
                        <div>Fax:</div>
                      </div>
                      <div>
                        <div>Star Classes Joint Stock Company</div>
                        <div>No. 8 Ton That Thuyet, My Dinh, Hanoi</div>
                        <div>+84 986295956</div>
                        <div>+84 986295956</div>
                      </div>
                      <div>
                        <div id="bill-date">Date: ${time}</div>
                      </div>
                    </div>`);
  a.document.write(divContentTop);
  a.document.write(divContentBody);
  a.document.write(divContentBot1);
  a.document.write(divContentBot2);
  a.document.write(
    `</div>
    </main>`
  );
  a.document.write('</html>');
  a.document.close(); // necessary for IE >= 10
  a.focus(); // necessary for IE >= 10*/
  // a.print();
  setTimeout(function () {
    a.print();
    // a.close();
  }, 1000);
  return true;
}

var time = new Date().toLocaleString('vi-VI');
