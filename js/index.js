import { debounce } from './untilities.js';

// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);

// Slide picture
var slideImgWrapper = document.querySelector('.slide-imgs');
var slideImgs = document.querySelectorAll('.slide-img');
var slideDots = document.querySelectorAll('.slide-dots span');
const sliderImgWidth = slideImgs[0].offsetWidth;
let positionX = 0;
let currentIndex = 0;
let newIndex = 0;
slideDots.forEach((item, index) => {
  item.addEventListener(
    'click',
    debounce(
      function (e) {
        newIndex = index;
        if (newIndex == currentIndex) return;
        showSlide(currentIndex, newIndex);
        currentIndex = newIndex;
      },
      500,
      true
    )
  );
});

setInterval(() => {
  if (currentIndex == slideImgs.length - 1) {
    showSlide(currentIndex, 0);
    currentIndex = 0;
  } else {
    showSlide(currentIndex, currentIndex + 1);
    currentIndex++;
  }
}, 5000);
// var flag = 0;
function showSlide(index1, index2) {
  if (index2 > index1) {
    slideImgWrapper.innerHTML = '';
    slideImgWrapper.appendChild(slideImgs[index1]);
    slideImgWrapper.appendChild(slideImgs[index2]);
    slideImgWrapper.style.transform = `translateX(-${sliderImgWidth}px)`;
    setTimeout(() => {
      slideImgWrapper.style.transition = 'unset';
      addLastChild(slideImgWrapper);
      slideImgWrapper.style.transform = 'translateX(0)';
    }, 500);
    slideImgWrapper.style.transition = '0.5s';
  }
  if (index2 < index1) {
    slideImgWrapper.innerHTML = '';
    slideImgWrapper.appendChild(slideImgs[index2]);
    slideImgWrapper.appendChild(slideImgs[index1]);
    slideImgWrapper.style.transition = 'unset';
    slideImgWrapper.style.transform = `translateX(-${sliderImgWidth}px)`;
    setTimeout(() => {
      slideImgWrapper.style.transition = '0.5s';
      slideImgWrapper.style.transform = 'translateX(0)';
      // addLastChild(slideImgWrapper);
    }, 500);
  }
  let dotCurrent = document.querySelector('.dot-active');
  dotCurrent.classList.remove('dot-active');
  slideDots[index2].classList.add('dot-active');
}
// // Auto matic slide show
// setInterval(() => {
//   if (currentIndex == 0) flag = 0;
//   if (currentIndex == 4) flag = 1;
//   if (flag == 0) currentIndex++;
//   if (flag == 1) currentIndex--;
//   showSlide(currentIndex);
// }, 4000);

var teacherBox = document.querySelector('.hot-teacher');
var btnPre = document.querySelector('.teacher-pre');
var btnNext = document.querySelector('.teacher-next');
// Slide Teacher
teacherBox.addEventListener(
  'click',
  debounce(
    function (e) {
      var teacherItem = document.querySelectorAll('.teacher-item');
      var teacherItemWidth =
        teacherItem[1].offsetLeft - teacherItem[0].offsetLeft;
      var teacherWrapper = document.querySelector('.teacher-wrapper');
      if (e.target.matches('.teacher-next')) {
        teacherWrapper.style.transform = `translateX(-${teacherItemWidth}px)`;
        setTimeout(() => {
          teacherWrapper.style.transition = 'unset';
          addLastChild(teacherWrapper);
          teacherWrapper.style.transform = 'translateX(0)';
        }, 300);
        teacherWrapper.style.transition = '0.3s';
      }

      if (e.target.matches('.teacher-pre')) {
        teacherWrapper.style.transition = 'unset';
        addFirstChild(teacherWrapper);
        teacherWrapper.style.transform = `translateX(-${teacherItemWidth}px)`;
        setTimeout(() => {
          teacherWrapper.style.transition = '0.3s';
          teacherWrapper.style.transform = 'translateX(0)';
        }, 300);
      }
    },
    300,
    true
  )
);

// Auto Run Slide Teacher
// setInterval(function () {
//   var teacherItem = document.querySelectorAll('.teacher-item');
//   var teacherWrapper = document.querySelector('.teacher-wrapper');
//   var teacherItemWidth = teacherItem[0].offsetWidth + 30;
//   console.log(teacherItemWidth);
//   teacherWrapper.style.transform = `translateX(-${teacherItemWidth}px)`;
//   setTimeout(() => {
//     teacherWrapper.style.transition = 'unset';
//     addLastChild(teacherWrapper);
//     teacherWrapper.style.transform = 'translateX(0)';
//   }, 500);
//   teacherWrapper.style.transition = '0.5s';
// }, 3000);

function addLastChild(slideList) {
  var firstChild = slideList.firstElementChild;
  slideList.appendChild(firstChild);
}

function addFirstChild(slideList) {
  var lastChild = slideList.lastElementChild;
  slideList.insertBefore(lastChild, slideList.children[0]);
}

// Trending Item
var trendingItem = document.querySelector('.trending-item');
var trendingItemColumn = document.querySelectorAll(
  '.trending-item-wrapper-column'
);
var trendingItemInnerWidth = trendingItem.offsetWidth - 20;
trendingItemColumn.forEach((item) => {
  item.style.width = `${trendingItemInnerWidth}px`;
});

// Mới ra mắt
var trendingDotsNewCourse = document.querySelectorAll(
  '.new-course .trending-dots span'
);
trendingDotsNewCourse.forEach((item, index) => {
  item.addEventListener('click', function () {
    let trendingDotNewCourseActive = document.querySelector(
      '.new-course .dot-active'
    );
    trendingDotNewCourseActive.classList.remove('dot-active');
    item.parentElement.previousElementSibling.style.transform = `translateX(${
      index * (-trendingItemInnerWidth - 20)
    }px)`;
    item.classList.add('dot-active');
  });
});

// Học nhiều
var trendingDotsNewCourse = document.querySelectorAll(
  '.most-student .trending-dots span'
);
trendingDotsNewCourse.forEach((item, index) => {
  item.addEventListener('click', function () {
    let trendingDotNewCourseActive = document.querySelector(
      '.most-student .dot-active'
    );
    trendingDotNewCourseActive.classList.remove('dot-active');
    item.parentElement.previousElementSibling.style.transform = `translateX(${
      index * (-trendingItemInnerWidth - 20)
    }px)`;
    item.classList.add('dot-active');
  });
});

// Khoá học VIP
var trendingDotsNewCourse = document.querySelectorAll(
  '.vip-course .trending-dots span'
);
trendingDotsNewCourse.forEach((item, index) => {
  item.addEventListener('click', function () {
    let trendingDotNewCourseActive = document.querySelector(
      '.vip-course .dot-active'
    );
    trendingDotNewCourseActive.classList.remove('dot-active');
    item.parentElement.previousElementSibling.style.transform = `translateX(${
      index * (-trendingItemInnerWidth - 20)
    }px)`;
    item.classList.add('dot-active');
  });
});
