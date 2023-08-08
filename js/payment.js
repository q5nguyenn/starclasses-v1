import {
  getItem,
  setItem,
  updateAll,
  loading,
  getDataFromJSON,
} from './untilities.js';

var payItemMenu = document.querySelectorAll('.pay-item-menu');
payItemMenu.forEach((item) => {
  item.addEventListener('click', function () {
    item.nextElementSibling.classList.toggle('show-pay-item-bank');
  });
});

// Render ra các khoá học cần thanh toán
var courseInCart = document.querySelector('.course-in-cart');

async function renderCourseInCart() {
  var userInfo = getItem('user');
  var temp = '';
  var arr = [];
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (userInfo.cart.includes(item.id)) {
      arr.push(item);
    }
  });
  arr.forEach((item) => {
    temp += `<a class="course-profile-item" href='./course.html?id=${item.id}'>
              <div class="course-profile-img">
                <img src="${item.cover}" alt="" />
              </div>
              <div class="course-profile-wrapper">
                <div class="course-profile-info">
                  <div class="course-profile-name">${item.name}</div>
                  <div class="course-profile-teacher">
                    <div class="course-profile-teacher-img">
                      <img src="${item.teacher_avatar}" alt="" />
                    </div>
                    <div class="course-profile-teacher-name">${item.teacher}</div>
                  </div>
                </div>
                <div class="course-profile-price">
                  <div>${item.price_sale}$</div>
                  <div>${item.price_old}$</div>
                </div>
                <div class="course-profile-delele" >
                  <i class="bi bi-x-lg" data-id="${item.id}"></i>
                </div>
              </div>
            </a>`;
  });
  courseInCart.innerHTML = temp;
}

// Xoá khoá học trong giỏ
var cartCourseCount = document.querySelector('#cart-course');
courseInCart.addEventListener('click', handleDeleteCourse);
function handleDeleteCourse(e) {
  if (e.target.matches('.course-profile-delele i')) {
    e.preventDefault();
    let idCourse = e.target.dataset.id;
    var userInfo = getItem('user');
    userInfo.cart.forEach((item, index) => {
      if (item == idCourse) {
        userInfo.cart.splice(index, 1);
        cartCourseCount.textContent = userInfo.cart.length;
      }
    });
    setItem('user', userInfo);
    updateAll(userInfo);
    renderCourseInCart();
    displayMoney();
  }
}

// Hiển thị tổng số tiền
var payTotalSale = document.querySelector('.pay-total-price-sale');
var payTotalOld = document.querySelector('.pay-total-price-old');
var payTotalPercent = document.querySelector('.pay-total-price-percent');
async function displayMoney() {
  let totalPriceSale = 0;
  let totalPriceOld = 0;
  var userInfo = getItem('user');
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (userInfo.cart.includes(item.id)) {
      totalPriceSale += item.price_sale;
      totalPriceOld += item.price_old;
    }
  });
  payTotalSale.textContent = totalPriceSale.toFixed(2) + '$';
  payTotalOld.textContent = totalPriceOld.toFixed(2) + '$';
  payTotalPercent.textContent =
    Math.floor(((totalPriceOld - totalPriceSale) / totalPriceOld) * 100) + '%';
}

displayMoney();

// Hoàn tất thanh toán
var btnFinishPay = document.querySelector('#finish-pay');
var popupSuccess = document.querySelector('.popup-pay-success');
btnFinishPay.addEventListener('click', handleFinishPay);
function handleFinishPay() {
  // Mua khoá combo
  if (!(comboValue == null)) {
    loading();
    setTimeout(() => {
      popupSuccess.style.display = 'flex';
      setTimeout(() => {
        let courseCombo = comboValue.split(',');
        let userInfo = getItem('user');
        for (let i = courseCombo.length - 1; i >= 0; i--) {
          if (userInfo.buy.includes(courseCombo[i])) {
            courseCombo.splice(i, 1);
          }
        }
        userInfo.buy = userInfo.buy.concat(courseCombo);
        setItem('user', userInfo);
        updateAll(userInfo);
        window.open('./profile.html?frame=1', '_self');
      }, 3000);
    }, 500);
    // Mua bình thường
  } else {
    loading();
    setTimeout(() => {
      popupSuccess.style.display = 'flex';
      setTimeout(() => {
        let userInfo = getItem('user');
        for (let i = userInfo.cart.length - 1; i >= 0; i--) {
          if (userInfo.buy.includes(userInfo.cart[i])) {
            userInfo.cart.splice(i, 1);
          }
        }
        userInfo.buy = userInfo.buy.concat(userInfo.cart);
        userInfo.cart = [];
        setItem('user', userInfo);
        updateAll(userInfo);
        window.open('./profile.html?frame=1', '_self');
      }, 3000);
    }, 500);
  }
}

// Get Combo Value
function getComboValue() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('combo');
  return value;
}

function getIdCombo() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('id');
  return value;
}

var comboValue = getComboValue();
if (!(comboValue == null)) {
  var courseCombo = comboValue.split(',');
  renderComboBuy();
  var data = await getDataFromJSON('./data/combo.JSON');
  data.some((item) => {
    if (item.id == getIdCombo()) {
      payTotalSale.textContent = item.price_sale.toFixed(2) + '$';
      payTotalOld.textContent = item.price_old.toFixed(2) + '$';
      payTotalPercent.textContent =
        Math.floor(
          ((item.price_old - item.price_sale) / item.price_old) * 100
        ) + '%';
      return true;
    }
  });
} else {
  renderCourseInCart();
}

async function renderComboBuy() {
  var temp = '';
  var arr = [];
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (courseCombo.includes(item.id)) {
      arr.push(item);
    }
  });
  arr.forEach((item) => {
    temp += `<a class="course-profile-item" href='./course.html?id=${item.id}'>
              <div class="course-profile-img">
                <img src="${item.cover}" alt="" />
              </div>
              <div class="course-profile-wrapper">
                <div class="course-profile-info">
                  <div class="course-profile-name">${item.name}</div>
                  <div class="course-profile-teacher">
                    <div class="course-profile-teacher-img">
                      <img src="${item.teacher_avatar}" alt="" />
                    </div>
                    <div class="course-profile-teacher-name">${item.teacher}</div>
                  </div>
                </div>
                <div class="course-profile-price">
                  <div>${item.price_sale}$</div>
                  <div>${item.price_old}$</div>
                </div>
              </div>
            </a>`;
  });
  courseInCart.innerHTML = temp;
}
