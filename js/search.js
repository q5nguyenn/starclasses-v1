import { getDataFromJSON, xoa_dau } from './untilities.js';

// Get SearchValue
function getSearchValue() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('search');
  return value;
}

var searchValueFull = getSearchValue();
var searchValueShow = document.querySelector('#search-value');
searchValueShow.textContent = searchValueFull;

// Search Value rỗng thì làm một số thứ sau
if (searchValueShow.textContent == '') {
  searchValueShow.parentElement.style.display = 'none';
  searchValueShow.parentElement.nextElementSibling.style.display = 'block';
}

// Show Hide Menu When Click
var deg = 0;
var searchItems = document.querySelectorAll('.search-item-title');
searchItems.forEach((item) => {
  item.nextElementSibling.classList.add('search-item-hide');
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

// Xoá dấu tiếng Việt
var searchValue = xoa_dau(
  document.querySelector('#search-value').textContent
).toLowerCase();

// Hiển thị kết quả tìm kiếm
var searchResultDisplay = document.querySelector('.search-result-display');
var searchResultCount = document.querySelector('.search-count-value');
var searchCount = document.querySelector('.search-count');

async function getSubjectsFinded() {
  var arr = [];
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (xoa_dau(item.name).toLowerCase().includes(searchValue)) {
      arr.push(item);
    }
  });
  if (arr.length < 10) {
    searchResultCount.textContent = '0' + arr.length;
  } else {
    searchResultCount.textContent = arr.length;
  }
  return arr;
}

getSubjectsFinded();

var jump = 5;
var end = 5;
function renderSubject(arr, end) {
  let itemTemp = '';
  if (arr.length == 0) {
    var btnShowMore = document.querySelector('.search-view-more');
    searchResultDisplay.innerHTML = `<ul>
                                      <li>Make sure all words are spelled correctly.</li>
                                      <li>Try different search terms.</li>
                                      <li>Try more general search terms.</li>
                                    </ul>`;
    searchCount.textContent = `Sorry, we couldn't find any results`;
    btnShowMore.style.display = 'none';
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

    // searchResultDisplay.insertAdjacentHTML('beforeend', itemTemp);
  }
  setTimeout(() => {
    searchResultDisplay.innerHTML = itemTemp;
  }, 500);
}

async function renderDefaultSubject() {
  var arr = await getSubjectsFinded();
  renderSubject(arr, end);
}

if (!(searchValue == null) && !(searchValue == '')) {
  renderDefaultSubject();
}

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
    var arr = await getSubjectsFinded();
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
    var arr = await getSubjectsFinded();
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
    var arr = await getSubjectsFinded();
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
    var arr = await getSubjectsFinded();
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
    var arr = await getSubjectsFinded();
    arr = handleSort(arr, 'student', 0);
    renderSubject(arr, end);
  } else if (sort2.checked == true) {
    end += jump;
    var arr = await getSubjectsFinded();
    arr = handleSort(arr, 'star', 0);
    renderSubject(arr, end);
  } else if (sort3.checked == true) {
    end += jump;
    var arr = await getSubjectsFinded();
    arr = handleSortDate(arr, 'update');
    renderSubject(arr, end);
  } else if (price1.checked == true) {
    end += jump;
    var arr = await getSubjectsFinded();
    arr = handleSort(arr, 'price_sale', 0);
    renderSubject(arr, end);
  } else if (price2.checked == true) {
    end += jump;
    var arr = await getSubjectsFinded();
    arr = handleSort(arr, 'price_sale', 1);
    renderSubject(arr, end);
  } else {
    end += jump;
    renderDefaultSubject();
  }
}

async function renderTwoRadio(value, star, index) {
  end += jump;
  var arr = [];
  arr = await getSubjectsFinded();
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
  let arr = await getSubjectsFinded();
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
  let arr = await getSubjectsFinded();
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
    var arr = await getSubjectsFinded();
    arr = handleSort(arr, 'student', 0);
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  } else if (sort2.checked == true) {
    var arr = await getSubjectsFinded();
    arr = handleSort(arr, 'star', 0);
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  } else if (sort3.checked == true) {
    var arr = await getSubjectsFinded();
    arr = handleSortDate(arr, 'update');
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  } else if (price1.checked == true) {
    var arr = await getSubjectsFinded();
    arr = handleSort(arr, 'price_sale', 0);
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  } else if (price2.checked == true) {
    var arr = await getSubjectsFinded();
    arr = handleSort(arr, 'price_sale', 1);
    arr = handleSortStarWithArr(arr, star.value);
    renderSubject(arr, end);
  }
}
// Sắp xếp theo sao
async function handleSortStar(item, value) {
  let arr = [];
  if (item.checked == true) {
    let data = await getSubjectsFinded();
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
  location.reload();
});

// Get SearchValue
function getValueFilter() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('filter');
  return value;
}

// Hiển thị theo đúng Link
var searchTitleReplace = document.querySelector('.search-result-title-replace');
var searchCountReplace = document.querySelector('.search-count-replace');
if (getValueFilter() == 'top-buy') {
  searchTitleReplace.textContent = 'Top selling / Most students';
  searchCountReplace.textContent = 'found';
  sort1.checked = true;
  handleClickSort('student', 0);
}

if (getValueFilter() == 'recent') {
  searchTitleReplace.textContent = 'Newest';
  searchCountReplace.textContent = 'found';
  sort3.checked = true;
  handleClickSortDate('update', sort3);
}

if (getValueFilter() == 'vip-course') {
  searchTitleReplace.textContent = 'VIP courses';
  searchCountReplace.textContent = 'found';
  var data = await getDataFromJSON('./data/subjects.JSON');
  var arr = [];
  data.forEach((item) => {
    if (item.tag == 'Vip') {
      arr.push(item);
    }
  });
  searchResultCount.textContent = arr.length;
  renderSubject(arr, arr.length);
  searchResultCount.textContent =
    arr.length < 10 ? '0' + arr.length : arr.length;
  var searchFilter = document.querySelector('.search-filter');
  viewMore.style.display = 'none';
  searchFilter.style.display = 'none';
}

if (getValueFilter() == 'top-sale') {
  searchTitleReplace.textContent = 'Super offer';
  searchCountReplace.textContent = 'found';
  var arr = await getDataFromJSON('./data/subjects.JSON');
  arr.sort(function (a, b) {
    return (
      (b.price_old - b.price_sale) / b.price_old -
      (a.price_old - a.price_sale) / a.price_old
    );
  });
  renderSubject(arr, end);
}

if (getValueFilter() == 'all') {
  searchTitleReplace.textContent = 'All courses';
  searchCountReplace.textContent = 'found';
  var arr = await getDataFromJSON('./data/subjects.JSON');
  renderSubject(arr, end);
}

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

// Show Hide Filter Colum
var filter = document.querySelector('.bi-sliders');
var searchWrapper = document.querySelector('.search-wrapper');
filter.addEventListener('click', function () {
  searchWrapper.classList.toggle('hide-search-filter');
});
