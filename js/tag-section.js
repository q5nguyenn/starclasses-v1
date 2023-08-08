import {
  getItem,
  loading,
  setItem,
  xoa_dau,
  getTemplStar,
  getDataFromJSON,
  coverStringToFormat,
} from './untilities.js';

// ./tag.html?section=kinh-doanh-khoi-va-nghiep&subject=chung-khoan
// Hiển thị kết quả tìm kiếm
var section = document.querySelector('#section');
var subject = document.querySelector('#subject');
var searchResultDisplay = document.querySelector('.search-result-display');
var searchResultCount = document.querySelector('.search-count-value');
var searchCount = document.querySelector('.search-count');

function getValueFilter() {
  var url = new URL(document.URL);
  var value1 = url.searchParams.get('section');
  var value2 = url.searchParams.get('subject');
  if (value2 == null) {
    subject.previousElementSibling.style.display = 'none';
  }
}
getValueFilter();

var searchWrapperTitle = document.querySelector('.search-wrapper-title');

async function getSection() {
  var url = new URL(document.URL);
  var value1 = url.searchParams.get('section');
  // var sectionName = '';
  var data = await getDataFromJSON('./data/courses.JSON');
  data.some((item) => {
    if (coverStringToFormat(item.topic) == value1) {
      section.textContent = item.topic;
      searchWrapperTitle.textContent = `${item.topic} courses`;
      section.href = `./tag-section.html?section=${value1}`;
      return true;
    }
  });
  return section.textContent;
}

getSection();

// Xuất ra mảng thông tin các khoá học
// Dựa vào Section
async function getSubjectBaseSection() {
  var value = await getSection();
  var data = await getDataFromJSON('./data/subjects.JSON');
  var arr = [];
  data.forEach((item) => {
    if (item.section == value) {
      arr.push(item);
    }
  });
  if (arr.length < 10) {
    searchResultCount.textContent = '0' + arr.length;
  } else {
    searchResultCount.textContent = arr.length;
  }
  if (arr.length <= 5) {
    preBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
  return arr;
}

// test http://127.0.0.1:5500/tag-section.html?section=kinh-doanh-va-khoi-nghiep&subject=chung-khoan

// Show Hide Menu When Click
var viewMore = document.querySelector('#view-more');
var deg = 0;
var searchItems = document.querySelectorAll('.search-item-title');
searchItems.forEach((item) => {
  item.nextElementSibling.classList.toggle('search-item-hide');
  item.addEventListener('click', function () {
    item.nextElementSibling.classList.toggle('search-item-hide');
    item.nextElementSibling.classList.toggle('search-item-show');
    if (item.lastElementChild.classList.contains('rotate')) {
      item.lastElementChild.style.animation = 'none';
      item.lastElementChild.style.animation =
        'rotate-left 0.1s ease-in-out both';
    } else {
      item.lastElementChild.style.animation = 'none';
      item.lastElementChild.style.animation =
        'rotate-right 0.1s ease-in-out both';
    }
    if (deg == 0) deg = 180;
    if (deg == 180) deg = 0;
    item.lastElementChild.classList.toggle('rotate');
  });
});

var begin = 0;
var jump = 5;
var end = 5;

function renderSubject(arr, end) {
  let itemTemp = '';
  if (arr.length == 0) {
    searchResultDisplay.innerHTML = `<ul>
                                      <li>Courses are being updated.</li>
                                      <li>Try similar courses.</li>
                                      <li>Happy learning!</li>
                                    </ul>`;
    searchCount.textContent = `There are currently no courses available!`;
    viewMore.style.display = 'none';
    return;
  }
  if (arr.length <= 5) {
    viewMore.innerHTML = '';
    viewMore.style.padding = 0;
  } else if (end >= arr.length) {
    end = arr.length;
    loadViewMore();
    setTimeout(() => {
      viewMore.innerHTML = "That's all";
    }, 500);
  } else loadViewMore();
  if (arr.length < end) {
    end = arr.length;
  }
  for (let i = 0; i < end; i++) {
    let date = new Date(arr[i].update).toLocaleDateString('vi-VN');
    let hour = arr[i].time[0] < 10 ? '0' + arr[i].time[0] : arr[i].tim[0];
    // let minute = item.time[1] < 10 ? '0' + item.time[1] : item.time[1];
    itemTemp += `<a class="search-result-item" href="./course.html?id=${
      arr[i].id
    }">
                      <div class="search-result-img">
                        <img
                          src="${arr[i].cover}"
                          alt=""
                        />
                      </div>
                      <div class="search-result-wrapper">
                        <div class="search-result-info">
                          <div class="search-result-name">${arr[i].name}</div>
                          <div class="search-result-desc">
                          ${arr[i].desc}
                          </div>
                          <div class="course-teacher-name">${
                            arr[i].teacher
                          }</div>
                          <div class="course-students-count">
                            <i class="bi bi-people-fill"></i>
                            <span>${arr[i].student}</span>
                          </div>
                          <div class="search-result-star">
                            <span>${arr[i].star.toFixed(1)}</span>
                            <span class="course-star">
                              <i class="bi bi-star-fill"></i>
                            </span>
                            <span>(${arr[i].view_rate})</span>
                          </div>
                          <div class="search-result-time">
                            <span>${hour} hours total</span><i class="bi bi-dot"></i>
                            <span>Update ${date}</span>
                          </div>
                        </div>
                        <div class="search-result-price">
                          <div>${arr[i].price_sale}$</div>
                          <div>${arr[i].price_old}$</div>
                        </div>
                      </div>
                    </a>`;
    setTimeout(() => {
      searchResultDisplay.innerHTML = itemTemp;
    }, 500);

    // searchResultDisplay.insertAdjacentHTML('beforeend', itemTemp);
  }
}

async function renderDefaultSubject() {
  var arr = await getSubjectBaseSection();
  renderSubject(arr, end);
}

renderDefaultSubject();

// Học nhiều nhất
var sort1 = document.querySelector('#sort1');
var sort2 = document.querySelector('#sort2');
var sort3 = document.querySelector('#sort3');
var price1 = document.querySelector('#price1');
var price2 = document.querySelector('#price2');
// var price3 = document.querySelector('#price3');
var star1 = document.querySelector('#star1');
var star2 = document.querySelector('#star2');
var star3 = document.querySelector('#star3');
var star4 = document.querySelector('#star4');
var starArrange = document.querySelectorAll('input[name="star"]');
// Xem thêm Default
var viewMore = document.querySelector('#view-more');
viewMore.addEventListener('click', handleSortViewMore);
async function handleSortViewMore() {
  // 4.5 Sao & Học nhiều
  if (star1.checked == true && sort1.checked == true) {
    renderTwoRadio('student', star1, 0);
    // 4.5 Sao & nhiều sao
  } else if (star1.checked == true && sort2.checked == true) {
    renderTwoRadio('star', star1, 0);
    // 4.5 Sao & Gần đây nhất
  } else if (star1.checked == true && sort3.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSortDate(arr, 'update');
    arr = handleSortStarWithArr(arr, star1.value);
    renderSubject(arr, end);
    // 4.5 sao và giá bán cao đến thấp
  } else if (star1.checked == true && price1.checked == true) {
    renderTwoRadio('price_sale', star1, 0);
    // 4.5 sao và giá bán thấp đến cao
  } else if (star1.checked == true && price2.checked == true) {
    renderTwoRadio('price_sale', star1, 0);
    // 4.0 sao
  } else if (star2.checked == true && sort1.checked == true) {
    renderTwoRadio('student', star2, 0);
    // 4.0 Sao & nhiều sao
  } else if (star2.checked == true && sort2.checked == true) {
    renderTwoRadio('star', star2, 0);
    // 4.0 Sao & Gần đây nhất
  } else if (star2.checked == true && sort3.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSortDate(arr, 'update');
    arr = handleSortStarWithArr(arr, star2.value);
    renderSubject(arr, end);
    // 4.0 sao và giá bán cao đến thấp
  } else if (star2.checked == true && price1.checked == true) {
    renderTwoRadio('price_sale', star2, 0);
    // 4.0 sao và giá bán thấp đến cao
  } else if (star2.checked == true && price2.checked == true) {
    renderTwoRadio('price_sale', star2, 1);
    // 3.5 sao
  } else if (star3.checked == true && sort1.checked == true) {
    renderTwoRadio('student', star3, 0);
    // 3.5 Sao & nhiều sao
  } else if (star3.checked == true && sort2.checked == true) {
    renderTwoRadio('star', star3, 0);
    // 3.5 Sao & Gần đây nhất
  } else if (star3.checked == true && sort3.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSortDate(arr, 'update');
    arr = handleSortStarWithArr(arr, star3.value);
    renderSubject(arr, end);
    // 3.5 sao và giá bán cao đến thấp
  } else if (star3.checked == true && price1.checked == true) {
    renderTwoRadio('price_sale', star3, 0);
    // 3.5 sao và giá bán thấp đến cao
  } else if (star3.checked == true && price2.checked == true) {
    renderTwoRadio('price_sale', star3, 1);
    // 3.0 sao
  } else if (star4.checked == true && sort1.checked == true) {
    renderTwoRadio('student', star4, 0);
    // 3.0 Sao & nhiều sao
  } else if (star4.checked == true && sort2.checked == true) {
    renderTwoRadio('star', star4, 0);
    // 3.0 Sao & Gần đây nhất
  } else if (star4.checked == true && sort3.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSortDate(arr, 'update');
    arr = handleSortStarWithArr(arr, star4.value);
    renderSubject(arr, end);
    // 3.0 sao và giá bán cao đến thấp
  } else if (star4.checked == true && price1.checked == true) {
    renderTwoRadio('price_sale', star4, 0);
    // 3.0 sao và giá bán thấp đến cao
  } else if (star4.checked == true && price2.checked == true) {
    renderTwoRadio('price_sale', star4, 1);
  } else if (sort1.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSort(arr, 'student', 0);
    renderSubject(arr, end);
  } else if (sort2.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSort(arr, 'star', 0);
    renderSubject(arr, end);
  } else if (sort3.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSortDate(arr, 'update');
    renderSubject(arr, end);
  } else if (price1.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSort(arr, 'price_sale', 0);
    renderSubject(arr, end);
  } else if (price2.checked == true) {
    end += jump;
    var arr = await getSubjectBaseSection();
    arr = handleSort(arr, 'price_sale', 1);
    renderSubject(arr, end);
  } else {
    end += jump;
    renderDefaultSubject();
  }
}

async function renderTwoRadio(value, star, index) {
  end += jump;
  var arr = await getSubjectBaseSection();
  arr = await handleSort(arr, value, index);
  arr = handleSortStarWithArr(arr, star.value);
  renderSubject(arr, end);
}

function handleSortStarWithArr(arr, value) {
  var data = [];
  arr.forEach((item) => {
    if (item.star >= value) {
      data.push(item);
    }
  });
  return data;
}

// Render khi click vào Button Radio
// Xem thêm học nhiều nhất
sort1.addEventListener('click', function () {
  handleClickSort('student', 0);
});

sort2.addEventListener('click', function () {
  handleClickSort('star', 0);
});

sort3.addEventListener('click', function () {
  handleClickSortDate('update');
});

price1.addEventListener('click', function () {
  handleClickSort('price_sale', 0);
});

price2.addEventListener('click', function () {
  handleClickSort('price_sale', 1);
});

async function handleClickSort(value, index) {
  let arr = await getSubjectBaseSection();
  arr = handleSort(arr, value, index);
  starArrange.forEach((ele) => {
    if (ele.checked == true) {
      arr = handleSortStarWithArr(arr, ele.value);
      arr = handleSort(arr, value, index);
    }
  });
  renderSubject(arr, end);
}

async function handleClickSortDate(value) {
  let arr = await getSubjectBaseSection();
  arr = handleSortDate(arr, value);
  starArrange.forEach((item) => {
    if (item.checked == true) {
      arr = handleSortStarWithArr(arr, item.value);
      arr = handleSortDate(arr, value);
    }
  });
  renderSubject(arr, end);
}

//
starArrange.forEach((item) => {
  item.addEventListener('click', function () {
    handleClickSortStar(item);
  });
});

async function handleClickSortStar(star) {
  if (
    sort1.checked == false &&
    sort2.checked == false &&
    sort3.checked == false &&
    price1.checked == false &&
    price2.checked == false
  ) {
    var arr = await handleSortStar(star, star.value);
    renderSubject(arr, end);
  } else if (sort1.checked == true) {
    var arr = await getSubjectBaseSection();
    arr = handleSort(arr, 'student', 0);
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  } else if (sort2.checked == true) {
    var arr = await getSubjectBaseSection();
    arr = handleSort(arr, 'star', 0);
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  } else if (sort3.checked == true) {
    var arr = await getSubjectBaseSection();
    arr = handleSortDate(arr, 'update');
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  } else if (price1.checked == true) {
    var arr = await getSubjectBaseSection();
    arr = handleSort(arr, 'price_sale', 0);
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  } else if (price2.checked == true) {
    var arr = await getSubjectBaseSection();
    arr = handleSort(arr, 'price_sale', 1);
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  }
}
// Sắp xếp theo sao
async function handleSortStar(item, value) {
  let arr = [];
  if (item.checked == true) {
    let data = await getSubjectBaseSection();
    data.forEach((ele) => {
      if (ele.star >= value) {
        arr.push(ele);
      }
    });
    return arr;
  }
}

// Hàm sắp xếp 1 là tăng, 0 là giảm
function handleSort(arr, value, index) {
  if (index == 1) {
    arr.sort(function (a, b) {
      return a[value] - b[value];
    });
  } else {
    arr.sort(function (a, b) {
      return b[value] - a[value];
    });
  }
  return arr;
}

// Sắp xếp theo ngày gần nhất
function handleSortDate(arr, value) {
  arr.sort(function (a, b) {
    return new Date(b[value]).getTime() - new Date(a[value]).getTime();
  });
  return arr;
}

// Clear Filter
var btnClearFilter = document.querySelector('.search-filter-title button');
btnClearFilter.addEventListener('click', function () {
  window.open(window.location.href, '_self');
});

// Fake loadig view more
function loadViewMore() {
  viewMore.style.padding = '10px 15px';
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

// Kết thúc phần tìm kiếm

// Render phổ biến nhất, mới nhất
var courseFrame = document.querySelector('.course-frame');
var tagMenu = document.querySelectorAll('.tag-menu-item');
tagMenu.forEach((item) => {
  item.addEventListener('click', function () {
    var tagMenuActive = document.querySelector('.tag-is-active');
    tagMenuActive.classList.remove('tag-is-active');
    item.classList.add('tag-is-active');
    // var filter = item.dataset.filter;
  });
});

// Render Top Subject
var top = 6;
function renderTopSubject(arr, top) {
  let temp = '';
  if (arr.length < top) {
    top = arr.length;
  }
  for (let i = 0; i < top; i++) {
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
  courseFrame.innerHTML = temp;
}

// Các nút next, pre khoá học
var i = 0;
var searchWrapperFrame = document.querySelector('.search-wrapper-frame');
var preBtn = document.querySelector('.teacher-pre');
// preBtn.style.display = 'none';
var nextBtn = document.querySelector('.teacher-next');
var courseFrame = document.querySelector('.course-frame');
var courseFrameWrapper = document.querySelector('.course-frame-wrapper');
searchWrapperFrame.addEventListener('click', function (e) {
  var courseItems = document.querySelectorAll('.course-item');
  console.log(courseItems.length);
  var widthCourseItem = courseItems[0].offsetWidth + 10;
  if (e.target.matches('.teacher-pre')) {
    console.log(1);
    if (i == 0) {
      return;
    } else {
      i++;
      courseFrame.style.transform = `translateX(${widthCourseItem * i}px)`;
    }
  }
  if (e.target.matches('.teacher-next')) {
    if (
      i + courseItems.length ==
      Math.round((courseFrameWrapper.offsetWidth + 10) / widthCourseItem)
    ) {
      return;
    } else {
      i--;
      courseFrame.style.transform = `translateX(${widthCourseItem * i}px)`;
    }
  }
});

// Click Popular or Newest
var tagMenuItems = document.querySelectorAll('.tag-menu-item');
tagMenuItems.forEach((item) => {
  item.addEventListener('click', function () {
    if (item.dataset.filter == 'student') {
      renderNewest();
    } else if (item.dataset.filter == 'update') {
      renderMost();
    }
  });
});

async function renderNewest() {
  var arr = await getSubjectBaseSection();
  arr = handleSort(arr, 'student', 0);
  renderTopSubject(arr, 6);
}
renderNewest();

async function renderMost() {
  var arr = await getSubjectBaseSection();
  arr = handleSortDate(arr, 'update');
  renderTopSubject(arr, 6);
}

// Các chủ đề phổ biến
var popularTag = document.querySelector('.popular-tag-wrapper');
var topPop = 10;
async function renderPopularTopic(topPop) {
  var arr = await getSectionLists();
  var url = new URL(document.URL);
  var value1 = url.searchParams.get('section');
  let temp = '';
  if (arr.length < topPop) {
    topPop = arr.length;
  }
  for (let i = 0; i < topPop; i++) {
    let url = `./tag-subject.html?section=${value1}&subject=${coverStringToFormat(
      arr[i]
    )}`;
    temp += `<a class="popular-tag-item" href="${url}">${arr[i]}</a>`;
  }
  popularTag.innerHTML = temp;
}
renderPopularTopic(topPop);

// Các topic liên quan

async function getSectionLists() {
  var idSection;
  var arr = [];
  var dataCourses = await getDataFromJSON('./data/courses.JSON');
  var dataCoursesList = await getDataFromJSON('./data/coursesList.JSON');
  dataCourses.forEach((item) => {
    if (item.topic == section.textContent) {
      idSection = item.id;
    }
  });
  dataCoursesList.forEach((item) => {
    if (item.id == idSection) {
      arr = item.course;
    }
  });
  return arr;
}

getSectionLists();

// if (!(searchValue == null) && !(searchValue == '')) {
//   renderDefaultSubject();
// }

// Show Hide Filter Colum
var filter = document.querySelector('.bi-sliders');
var searchWrapper = document.querySelector('.search-wrapper-tag');
filter.addEventListener('click', function () {
  console.log(1);
  searchWrapper.classList.toggle('hide-search-filter');
});
