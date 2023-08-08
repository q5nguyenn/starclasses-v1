import {
  getItem,
  setItem,
  coverStringToFormat,
  xoa_dau,
  debounce,
} from './untilities.js';

// Scroll Auto hide menu Nav
var header = document.querySelector('.navs');
var heightNav = header.offsetHeight;
var lastScrollTop = 0;
window.addEventListener('scroll', function (e) {
  var st = window.pageYOffset;
  if (st > lastScrollTop) {
    header.classList.remove('navs-show');
    header.classList.add('navs-hide');
  }
  if (st < lastScrollTop) {
    header.classList.remove('navs-hide');
    header.classList.add('navs-show');
  }
  lastScrollTop = st;
});

// Open Search Page
var formSearch = document.querySelector('#nav-search');
var formSearchMobile = document.querySelector('#nav-search-mobile');
// var formSearch = document.querySelector('.nav-search');
formSearch.addEventListener('submit', function (e) {
  let searchValue = document.querySelector('#search-item');
  console.log(searchValue);
  e.preventDefault();
  openSearchPage(searchValue.value);
});

function openSearchPage(value) {
  let here = new URL(window.location.href);
  let url = `search.html?search=${value}`;
  here.searchParams.append('search', url);
  window.open(url, '_self');
}
formSearchMobile.addEventListener('submit', function (e) {
  let searchValue = document.querySelector('#search-item-mobile');
  console.log(searchValue);
  let here = new URL(window.location.href);
  e.preventDefault();
  let url = `search.html?search=${searchValue.value}`;
  here.searchParams.append('search', url);
  window.open(url, '_self');
});

// SignIn SignOut
var navUser = document.querySelector('.nav-user');
var navSign = document.querySelector('.nav-sign');
var singOut = document.querySelector('#signout');
var singOutMobile = document.querySelector('#signout-mobile');
var loading = document.querySelector('.loading');

handleLogoutLogIn();
function handleLogoutLogIn() {
  var login = getItem('login');
  if (login == true) {
    navSign.style.display = 'none';
    navUser.style.display = 'inline-block';
  } else {
    navSign.style.display = 'flex';
    navUser.style.display = 'none';
  }
}

singOut.addEventListener('click', handleSignOut);
singOutMobile.addEventListener('click', handleSignOut);
function handleSignOut() {
  setItem('login', false);
  loading.style.display = 'flex';
  localStorage.removeItem('user');
  setTimeout(() => {
    loading.style.display = 'none';
    handleLogoutLogIn();
    window.open('./index.html', '_self');
  }, 500);
}

// Hiển thị tên đăng nhập và email
var userLogin = document.querySelector('.user-login');
var userLogout = document.querySelector('.user-logout');
var login = getItem('login');
if (login == true) {
  userLogin.style.display = 'block';
  userLogout.style.display = 'none';
  var userInfo = getItem('user');
  var userName = document.querySelector('.nav-user-top-name');
  var userNameMobile = document.querySelector('.nav-user-top-name-mobile');
  var userMail = document.querySelector('.nav-user-top-email');
  var userMailMobile = document.querySelector('.nav-user-top-email-mobile');
  var userAvatar1 = document.querySelector('.nav-user-img img');
  var userAvatar2 = document.querySelector('.nav-user-top-img img');
  if (userInfo.fullname == '') {
    userName.textContent = userInfo.name;
    userNameMobile.textContent = userInfo.name;
  } else {
    userName.textContent = userInfo.fullname;
    userNameMobile.textContent = userInfo.fullname;
  }
  userAvatar1.src = userInfo.avatar;
  userAvatar2.src = userInfo.avatar;
  if (userInfo.email == '') {
    userMail.textContent = 'Bạn chưa cập nhật email';
    userMailMobile.textContent = 'Bạn chưa cập nhật email';
  } else {
    userMail.textContent = userInfo.email;
    userMailMobile.textContent = userInfo.email;
  }
}

// Nút kích hoạt mã
var activeVoucherTop = document.querySelector('#active-voucher-top');
activeVoucherTop.addEventListener('click', function () {
  var login = getItem('login');
  if (login == true) window.open('./profile.html?frame=2', '_self');
  else window.open('./signin.html', '_self');
});

// Nút giỏ hàng
var cartTop = document.querySelector('#cart-top');
var carTopMoblie = document.querySelector('#cart-top-mobile');
cartTop.addEventListener('click', handleClickCartTop);
carTopMoblie.addEventListener('click', handleClickCartTop);
function handleClickCartTop() {
  var login = getItem('login');
  if (login == true) window.open('./profile.html?frame=4', '_self');
  else window.open('./signin.html', '_self');
}

// Hiển thị menu trên TAB
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var tabItems = $('.tab-items');
var tabs = $('.tabs');
var tabItemInner = $('.tab-item-inner');
var tabItemsMobile = document.querySelector('.nav-moblie-row-mid');

// Display All Course In Menu
async function renderCourses() {
  var course = await getDataFromJSON('./data/courses.JSON');
  course.forEach((item) => {
    var url = `./tag-section.html?section=${coverStringToFormat(item.topic)}`;
    let itemTemp = `<a class="tab-item" href="${url}" data-course='${item.id}'>
                      ${item.icon}
                      <span>${item.topic}<span>
                    </a>`;
    tabItems.insertAdjacentHTML('beforeend', itemTemp);
    let itemTempMobile = `<a class="tab-item" href="${url}" data-course='${item.id}'>
                      ${item.icon}
                      <span>${item.topic}<span>
                    </a>`;
    tabItemsMobile.insertAdjacentHTML('beforeend', itemTempMobile);
  });
}
renderCourses();
// Drop Down CoursesList
tabs.addEventListener(
  'mouseover',
  debounce(function (e) {
    if (e.target.matches('.tab-item')) {
      tabItemInner.classList.add('tab-show');
      tabItemInner.classList.remove('tab-hide');
      renderCoursesList(e.target.dataset.course);
    }
  }, 300)
);

tabs.addEventListener('mouseleave', function (e) {
  tabItemInner.classList.add('tab-hide');
  tabItemInner.classList.remove('tab-show');
});

async function renderCoursesList(id) {
  tabItemInner.innerHTML = '';
  var course = await getDataFromJSON('./data/courses.JSON');
  var section;
  var courseList = await getDataFromJSON('./data/coursesList.JSON');
  courseList.forEach((item) => {
    if (item.id == id) {
      course.forEach((i) => {
        if (i.id == id) {
          section = i.topic;
        }
      });
      item.course.forEach((ele) => {
        var url = `./tag-subject.html?section=${coverStringToFormat(
          section
        )}&subject=${coverStringToFormat(ele)}`;
        let temp = `<a href="${url}" class="tab-item-link">${ele}</a>`;
        tabItemInner.insertAdjacentHTML('beforeend', temp);
      });
    }
  });
}

// Cart Course
var cartItemBought = document.querySelector('#cart-course');
var cartItemBoughtMobile = document.querySelector('#cart-course-mobile');
var login = getItem('login');
if (login == true) {
  let userInfo = getItem('user');
  if (userInfo.cart.length > 0) {
    cartItemBought.style.display = 'flex';
    cartItemBought.textContent = userInfo.cart.length;
    cartItemBoughtMobile.style.display = 'flex';
    cartItemBoughtMobile.textContent = userInfo.cart.length;
  }
}

async function getDataFromJSON(endPoint) {
  var promise = await fetch(endPoint);
  var data = await promise.json();
  return data;
}

// Menu Mobile----------------------------------------------------------------------------------------------------Mobile
var hamberger = document.querySelector('.nav-mobile-button');
var menuMobileFull = document.querySelector('.nav-mobile-fixed-full');
var menuMobile = document.querySelector('.nav-mobile-fixed');
hamberger.addEventListener('click', function () {
  menuMobileFull.style.display = 'block';
  menuMobileFull.style.animation =
    'animation:fade-in .5s cubic-bezier(.39,.575,.565,1.000) both';
  menuMobile.style.animation =
    'slide-in-left .5s cubic-bezier(.25,.46,.45,.94) both';
});
menuMobileFull.addEventListener('click', function (e) {
  if (
    e.target.matches('.nav-mobile-fixed-full') ||
    e.target.matches('.bi-x-lg')
  ) {
    menuMobile.style.animation =
      'slide-out-left .5s cubic-bezier(.25,.46,.45,.94) both';
    menuMobileFull.style.animation =
      'animation:fade-out .5s cubic-bezier(.39,.575,.565,1.000) both';
    setTimeout(() => {
      menuMobileFull.style.display = 'none';
    }, 500);
  }
});

//
var navMobileAccount = document.querySelector('.nav-mobile-account');
var navUserDropDownMobile = document.querySelector('.nav-user-dropdown-mobile');
navMobileAccount.addEventListener('click', function () {
  console.log(1);
  console.log(navUserDropDownMobile);
  navUserDropDownMobile.classList.toggle('show-mobile');
});

// close-search-mobile

var searchIconMobile = document.querySelector('#search-mobile');
var searchMobileFull = document.querySelector('.nav-mobile-search-full');
var searchMobile = document.querySelector('#nav-search-mobile');
searchIconMobile.addEventListener('click', function () {
  let searchValueMobile = document.querySelector('#search-item-mobile');
  searchMobileFull.style.display = 'block';
  searchMobileFull.style.animation =
    'animation:fade-in .5s cubic-bezier(.39,.575,.565,1.000) both';
  searchMobile.style.animation =
    'slide-in-top .5s cubic-bezier(.25,.46,.45,.94) both';
  searchValueMobile.focus();
});
searchMobileFull.addEventListener('click', function (e) {
  if (
    e.target.matches('.nav-mobile-fixed-full') ||
    e.target.matches('.bi-x-lg')
  ) {
    searchMobile.style.animation =
      'slide-out-top .5s cubic-bezier(.25,.46,.45,.94) both';
    menuMobileFull.style.animation =
      'animation:fade-out .5s cubic-bezier(.39,.575,.565,1.000) both';
    setTimeout(() => {
      searchMobileFull.style.display = 'none';
    }, 500);
  }
});

// Box hiển thị kết quả tìm kiếm
var searchResultPopup = document.querySelector('.search-result-popup');
searchResultPopup.style.width = formSearch.offsetWidth + 'px';
searchResultPopup.style.left = formSearch.offsetLeft + 'px';
searchResultPopup.style.top = header.offsetHeight + 'px';

async function getSubjectsFinded(value) {
  var arr = [];
  var temp = '';
  var promise = await fetch('./data/subjects.JSON');
  var data = await promise.json();
  data.forEach((item) => {
    if (xoa_dau(item.name).toLowerCase().includes(value)) {
      arr.push(item);
    }
  });
  if (arr.length == 0) {
    searchResultPopup.classList.remove('show-search-popup');
  }
  var log = 10;
  if (arr.length < 10) {
    log = arr.length;
  }
  for (let i = 0; i < log; i++) {
    let index = xoa_dau(arr[i].name).toLowerCase().indexOf(value);
    let string1 = arr[i].name.slice(0, index);
    let string2 = arr[i].name.slice(index, index + value.length);
    let string3 = arr[i].name.slice(index + value.length);
    temp += `<a class="search-result-item-popup" href="course.html?id=${arr[i].id}">
                <i class="bi bi-search"></i> <span>${string1}<b>${string2}</b>${string3}</span>
              </a>`;
  }
  searchResultPopup.innerHTML = temp;
  return arr;
}

var searchValue = document.querySelector('#search-item');
searchValue.addEventListener('input', function () {
  if (searchValue.value.trim() == '') {
    searchResultPopup.classList.remove('show-search-popup');
    return;
  } else {
    let value = xoa_dau(searchValue.value.trim().toLowerCase());
    searchResultPopup.classList.add('show-search-popup');
    getSubjectsFinded(value);
  }
});

searchValue.addEventListener('blur', function () {
  setTimeout(() => {
    searchResultPopup.classList.remove('show-search-popup');
  }, 300);
});
