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

var idPayNow = getIdPayNow();
async function renderCourseInCart() {
  var temp = '';
  var arr = [];
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (idPayNow == item.id) {
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

renderCourseInCart();

// Hiển thị tổng số tiền
var payTotalSale = document.querySelector('.pay-total-price-sale');
var payTotalOld = document.querySelector('.pay-total-price-old');
var payTotalPercent = document.querySelector('.pay-total-price-percent');
async function displayMoney() {
  let totalPriceSale = 0;
  let totalPriceOld = 0;
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (idPayNow == item.id) {
      totalPriceSale = item.price_sale;
      totalPriceOld = item.price_old;
    }
  });
  payTotalSale.textContent = totalPriceSale.toFixed(2) + '$';
  payTotalOld.textContent = totalPriceOld.toFixed(2) + '$';
  payTotalPercent.textContent =
    Math.floor(((totalPriceOld - totalPriceSale) / totalPriceOld) * 100) + '%';
  console.log(payTotalPercent);
}

displayMoney();

// Hoàn tất thanh toán
var btnFinishPay = document.querySelector('#finish-pay');
var popupSuccess = document.querySelector('.popup-pay-success');
btnFinishPay.addEventListener('click', handleFinishPay);
function handleFinishPay() {
  loading();
  setTimeout(() => {
    popupSuccess.style.display = 'flex';
    setTimeout(() => {
      let userInfo = getItem('user');
      if (!userInfo.buy.includes(idPayNow)) {
        userInfo.buy.push(idPayNow);
        setItem('user', userInfo);
        updateAll(userInfo);
        window.open('./profile.html?frame=1', '_self');
      }
    }, 2000);
  }, 500);
}

function getIdPayNow() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('pay');
  return value;
}
