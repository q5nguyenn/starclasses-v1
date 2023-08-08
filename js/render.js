import { getTemplStar, getDataFromJSON } from './untilities.js';

// Top Teacher Render
// var teacherItem = document.querySelector('.teacher-item');
var teacherWrapper = document.querySelector('.teacher-wrapper');
async function renderHotTeacher() {
  var data = await getDataFromJSON('./data/topteacher.JSON');
  data.forEach((item) => {
    let teacherTemp = `<a class="teacher-item" href="${item.link}">
                      <div class="teacher-img">
                        <img src="${item.avatar}" alt="">
                      </div>
                      <div class="teacher-name">${item.name}</div>
                      <div class="teacher-job">${item.job}</div>
                    </a>`;
    teacherWrapper.insertAdjacentHTML('beforeend', teacherTemp);
  });
}
renderHotTeacher();

// Render Top Bán Chạy
var topBuy = document.querySelector('#top-buy');
var topDiscount = document.querySelector('#top-discount');
var topBusiness = document.querySelector('#top-business');

// async function getCourse(name, number, condition) {
//   var arr = [];getSubjects
//   var promise = await fetch('./data/subjects.JSON');
//   var data = await promise.json();
//   data.forEach((item) => {
//     if (xoa_dau(item.name).toLowerCase().includes(searchValue)) {
//       arr.push(item);
//     }
//   });
//   renderSubject(arr);
//   return arr;
// }

// Hàm sắp xếp 1 là tăng, 0 là giảm

async function renderSubjectTopBuy() {
  var arr = await getDataFromJSON('./data/subjects.JSON');
  // Top 4 mua nhiều
  arr.sort(function (a, b) {
    return b.student - a.student;
  });
  renderTop4(arr, topBuy);
  // Top 4 khuyến mãi
  arr.sort(function (a, b) {
    return (
      (b.price_old - b.price_sale) / b.price_old -
      (a.price_old - a.price_sale) / a.price_old
    );
  });
  renderTop4(arr, topDiscount);
  // Top 4 Kinh doanh và khởi nghiệp
  var arrBussiness = [];
  arr.forEach((item) => {
    if (item.section == 'Business and Startup') {
      arrBussiness.push(item);
    }
  });
  renderTop4(arrBussiness, topBusiness);
}

renderSubjectTopBuy();

function renderTop4(arr, position) {
  let temp = '';
  for (let i = 0; i < 4; i++) {
    let discount = Math.floor(
      ((arr[i].price_old - arr[i].price_sale) / arr[i].price_old) * 100
    );
    temp += `<a href="./course.html?id=${arr[i].id}" class="course-item">
              <div class="slale-percent">-${discount}%</div>
              <div class="course-img">
                <img
                  src="${arr[i].cover}"
                  alt=""
                />
              </div>
              <div class="course-wrapper">
                <h3 class="course-title">
                ${arr[i].name}
                </h3>
                <div class="course-author">${arr[i].teacher}</div>
                <div class="course-review">
                  <span class="course-point">${arr[i].star.toFixed(1)}</span>
                  <span class="course-star">
                    ${getTemplStar(arr[i].star)}
                  </span>
                  <span class="course-review-count">(${arr[i].view_rate})</span>
                </div>
                <div class="course-price">
                  <span class="course-price-sale">${arr[i].price_sale}$</span>
                  <span class="course-price-old">${arr[i].price_old}$</span>
                </div>
              </div>
            </a>`;
  }
  position.innerHTML = temp;
}

// Render Three Trending Column
function renderTopTrending(arr, position, begin, end) {
  let temp = '';
  for (let i = begin; i <= end; i++) {
    temp += `<a class="trending-item-inner" href="./course.html?id=${arr[i].id}">
              <div class="trending-img">
                <img
                  src="${arr[i].cover}"
                  alt=""
                />
              </div>
              <div class="trending-content">
                <h3 class="course-title">
                ${arr[i].name}
                </h3>
                <div class="course-author">${arr[i].teacher}</div>
                <div class="course-price">
                  <span class="course-price-sale">${arr[i].price_sale}$</span>
                  <span class="course-price-old">${arr[i].price_old}$</span>
                </div>
              </div>
            </a>`;
  }
  position.innerHTML = temp;
}

// Mới ra mắt
var newCourseTrendingColumn = document.querySelectorAll(
  '.new-course .trending-item-wrapper-column'
);
newCourseTrendingColumn.forEach((item, index) => {
  sortSubjectByDate(item, index);
});

// Học nhiều nhất
var mostStudentTrendingColumn = document.querySelectorAll(
  '.most-student .trending-item-wrapper-column'
);
mostStudentTrendingColumn.forEach((item, index) => {
  sortSubjectByStudent(item, index);
});

// Khoá học VIP
var mostStudentTrendingColumn = document.querySelectorAll(
  '.vip-course .trending-item-wrapper-column'
);
mostStudentTrendingColumn.forEach((item, index) => {
  getVipCourse(item, index);
});

// Lấy ra các khoá học VIP
async function getVipCourse(item, index) {
  let arr = [];
  let data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    item.tag == 'Vip', arr.push(item);
  });
  renderTopTrending(arr, item, index * 3, (index + 1) * 3 - 1);
  return arr;
}

// Sort khoá học theo thời gian
async function sortSubjectByDate(item, index) {
  let arr = await getDataFromJSON('./data/subjects.JSON');
  arr.sort(function (a, b) {
    return new Date(b.update).getTime() - new Date(a.update).getTime();
  });
  renderTopTrending(arr, item, index * 3, (index + 1) * 3 - 1);
  return arr;
}

// Sort khoá học theo số học sinh học
async function sortSubjectByStudent(item, index) {
  let arr = await getDataFromJSON('./data/subjects.JSON');
  arr.sort(function (a, b) {
    return b.student - a.student;
  });
  renderTopTrending(arr, item, index * 3, (index + 1) * 3 - 1);
  return arr;
}

// Kinh doanh và khởi nghiệp
