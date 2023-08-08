import {
  getItem,
  setItem,
  updateAll,
  checkAllValidate,
  getDataFromJSON,
} from './untilities.js';
var dropdownMenu = document.querySelector('.dropdown-menu-title');
dropdownMenu.addEventListener('click', function () {
  this.nextElementSibling.classList.toggle('show');
});

// Dropdown Menu
var dropdownMenuList = document.querySelectorAll('.dropdown-menu-list div');
var alertRequest = document.querySelector('.dropdown-menu-alert');
dropdownMenuList.forEach((item) => {
  item.addEventListener('click', function () {
    alertRequest.style.display = 'none';
    item.parentElement.classList.remove('show');
    item.parentElement.previousElementSibling.firstElementChild.textContent =
      item.textContent;
  });
});

// Frame Menu
var profileNavs = document.querySelectorAll('.profile-cover-menu-item');
profileNavs.forEach((item, index) => {
  item.addEventListener('click', function () {
    chagepassNav.style.display = 'none';
    hideAllFrameAndNav();
    item.classList.add('is-active');
    let profileFrame = document.querySelector(`[data-frame="${index}"]`);
    profileFrame.classList.add('show');
  });
});

// Tiến trình học
var progressBar = document.querySelectorAll('.course-profile-progress');
progressBar.forEach((item) => {
  item.firstElementChild.style.width = item.dataset.progress + '%';
  if (item.dataset.progress == 100)
    item.firstElementChild.style.backgroundColor = '#00CF93';
});

// Hiển thị All thông
// Hiển thị tên đăng nhập và email
var userFullname = document.querySelector('.profile-cover-title');
var userName = document.querySelector('.profile-frame-username');
var chooseAvatar = document.querySelector('#choose-avatar');
var userAvatar = document.querySelector('.profile-frame-avatar img');
var userDesc = document.querySelector('textarea');
var userFullnameEdit = document.querySelector('#name');
var userMail = document.querySelector('#email');
var userBirth = document.querySelector('#birth');
var userPhone = document.querySelector('#phone');
var userAddress = document.querySelector('#address');
var userAvatarMain = document.querySelector('.nav-user-img img');
var userAvatarDropdown = document.querySelector('.nav-user-top-img img');
var btnUpdate = document.querySelector('.btn-update-user');
function renderUser() {
  var userInfo = getItem('user');
  if (userInfo.fullname == '') {
    userFullname.textContent = 'Student: ' + userInfo.name;
  } else userFullname.textContent = 'Student: ' + userInfo.fullname;
  userName.innerHTML = `<span>Username:</span> <b>${userInfo.name}</b>`;
  userAvatar.src = userInfo.avatar;
  userDesc.value = userInfo.desc;
  userFullnameEdit.value = userInfo.fullname;
  userMail.value = userInfo.email;
  userBirth.value = userInfo.birth;
  userPhone.value = userInfo.phone;
  userAddress.value = userInfo.address;
  userAvatarMain.src = userInfo.avatar;
  userAvatarDropdown.src = userInfo.avatar;
}
renderUser();

function updateUser() {
  var userInfo = getItem('user');
  userInfo.avatar = userAvatar.src;
  userInfo.desc = userDesc.value;
  userInfo.fullname = userFullnameEdit.value;
  userInfo.email = userMail.value;
  userInfo.birth = userBirth.value;
  userInfo.phone = userPhone.value;
  userInfo.address = userAddress.value;
  setItem('user', userInfo);
  renderUser();
  updateAll(userInfo);
}

chooseAvatar.addEventListener('change', function () {
  //Blod
  // var avatarURL = URL.createObjectURL(chooseAvatar.files[0]);
  // userAvatar.src = avatarURL;
  // Base64
  var fileReader = new FileReader();
  var file = chooseAvatar.files[0];
  fileReader.readAsDataURL(file);
  fileReader.onloadend = function (e) {
    let sizeOfPicture = ((e.target.result.length / 4) * 3) / 1024;
    if (
      !file.name.endsWith('.jpg') &&
      !file.name.endsWith('.jpeg') &&
      !file.name.endsWith('.png')
    ) {
      chooseAvatar.nextElementSibling.textContent =
        '*The image is must be a file of type: jpg, jpeg, png.';
      return;
    }
    if (sizeOfPicture > 500) {
      chooseAvatar.nextElementSibling.textContent =
        '*Image size must be less than 500KB.';
      return;
    }
    userAvatar.src = e.target.result;
    chooseAvatar.nextElementSibling.textContent = '';
  };
});

btnUpdate.addEventListener('click', function () {
  updateUser();
});

// Thay đổi mật khẩu
var btnChangePass = document.querySelector('.profile-frame-changepass');
var chagepassNav = document.querySelector('.change-pass');
var profileChangePass = document.querySelector('[data-frame="6"]');
btnChangePass.addEventListener('click', function () {
  hideAllFrameAndNav();
  chagepassNav.style.display = 'block';
  chagepassNav.classList.add('is-active');
  profileChangePass.classList.add('show');
});

// Hàm ẩn tất Frame và Nav-active
function hideAllFrameAndNav() {
  let profileNavOld = document.querySelector('.is-active');
  let profileFrameOld = document.querySelector('.show');
  profileFrameOld.classList.remove('show');
  profileNavOld.classList.remove('is-active');
}

// Hiển thị mật khẩu
var checkbox = document.querySelector('input[type="checkbox"]');
var inputPass = document.querySelectorAll('input[type="password"]');
checkbox.addEventListener('change', function () {
  if (checkbox.checked == true) {
    inputPass.forEach((item) => {
      item.type = 'text';
    });
  } else {
    inputPass.forEach((item) => {
      item.type = 'password';
    });
  }
});

//Thay đổi mật khẩu
var btnUpdatePass = document.querySelector('#change-pass');
btnUpdatePass.addEventListener('click', handleChangePass);
var alertChangePass = document.querySelector('.alert-update-password');
alertChangePass.textContent = 'Change password';

const rePassWord = /.{0,100}$/;
function handleChangePass() {
  alertChangePass.textContent = 'Change password';
  var userInfo = getItem('user');
  let nowpass = document.querySelector('#now-pass');
  let newpass1 = document.querySelector('#new-pass1');
  let newpass2 = document.querySelector('#new-pass2');
  if (nowpass.value != userInfo.password) {
    nowpass.parentElement.nextElementSibling.textContent =
      '*The password is incorrect';
  } else {
    nowpass.parentElement.nextElementSibling.innerHTML = '&nbsp;';
  }
  checkAllValidate(newpass1, rePassWord, 'Password', 8, 16);
  if (newpass1.value != newpass2.value) {
    newpass2.parentElement.nextElementSibling.textContent =
      '*Password do not match.';
  }
  if (
    nowpass.value == userInfo.password &&
    !checkAllValidate(newpass1, rePassWord, 'Password', 8, 16) &&
    newpass1.value == newpass2.value
  ) {
    newpass2.parentElement.nextElementSibling.innerHTML = '&nbsp;';
    userInfo.password = newpass2.value;
    alertChangePass.innerHTML = `<i class="bi bi-check-lg"></i> Password has been changed successfully.`;
    updateAll(userInfo);
  }
}

// Kiểm tra voucher
var activeVoucher = document.querySelector('#active-voucher');
var voucher = document.querySelector('#voucher');
var voucherContent = document.querySelector('.voucher-content');
activeVoucher.addEventListener('submit', handleSubmitVoucher);

async function handleSubmitVoucher(e) {
  var temp = 0;
  e.preventDefault();
  voucherContent.innerHTML = '';
  var data = await getDataFromJSON('./data/vouchers.JSON');
  if (!checkAllValidate(voucher, rePassWord, 'Voucher', 0, 100)) {
    data.forEach((item) => {
      if (item.name == voucher.value) {
        var user = getItem('user');
        if (user.buy.includes(item.courseID)) {
          voucherContent.innerHTML = `<i class="bi bi-check2-all"></i> The course has been activated or you have already purchased it.`;
        } else {
          voucherContent.innerHTML = `<i class="bi bi-check-lg"></i> You have successfully activated.
            <p>${item.info}</p>`;
          user.buy.push(item.courseID);
          setItem('user', user);
          updateAll(user);
          renderCourseBuy();
          renderStudying();
        }
        temp = 1;
      }
    });
    if (temp == 0) {
      voucherContent.innerHTML = `<i class="bi bi-x-lg voucher-wrong"></i> Voucher code does not exist or has expired.`;
    }
  }
}

// Chọn ảnh yêu cầu hỗ trợ
var imageRequest = document.querySelectorAll('.image-request');
var btnRequest = document.querySelector('#btn-request');
var popupRequest = document.querySelector('.popup-request');

imageRequest.forEach((item) => {
  item.addEventListener('change', function () {
    displayRequestImage(item);
  });
});

function displayRequestImage(item) {
  var avatarURL = URL.createObjectURL(item.files[0]);
  item.previousElementSibling.firstElementChild.src = avatarURL;
}

btnRequest.addEventListener('click', function () {
  if (dropdownMenu.textContent.trim() == 'Choose the type of support') {
    alertRequest.style.display = 'inline-block';
    return;
  }
  popupRequest.style.display = 'flex';
  alertRequest.style.display = 'none';
  setTimeout(() => {
    popupRequest.style.display = 'none';
    window.open('./profile.html?frame=3', '_self');
  }, 3000);
});

function getFrameValue() {
  var url = new URL(document.URL);
  var value = url.searchParams.get('frame');
  return value;
}

for (var i = 1; i <= 5; i++) {
  if (i == getFrameValue()) {
    chagepassNav.style.display = 'none';
    hideAllFrameAndNav();
    profileNavs[i].classList.add('is-active');
    let profileFrame = document.querySelector(`[data-frame="${i}"]`);
    profileFrame.classList.add('show');
  }
}

if (getFrameValue() >= 5) {
}

// Render các khoá học trong giỏ hàng
var courseInCart = document.querySelector('#course-in-cart');

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

renderCourseInCart();

// Xoá khoá học trong giỏ
var cartCourseCount = document.querySelector('#cart-course');
var cartCourseCountMobile = document.querySelector('#cart-course-mobile');
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
        cartCourseCountMobile.textContent = userInfo.cart.length;
      }
    });
    setItem('user', userInfo);
    updateAll(userInfo);
    renderCourseInCart();
  }
}

// Render các khoá học đã mua
var courseBuy = document.querySelector('#course-bought');
async function renderCourseBuy() {
  var userInfo = getItem('user');
  var temp = '';
  var arr = [];
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (userInfo.buy.includes(item.id)) {
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
  courseBuy.innerHTML = temp;
}

renderCourseBuy();

// Render các khoá học đang học
var studying = document.querySelector('#studying');
async function renderStudying() {
  var userInfo = getItem('user');
  // console.log(userInfo.buy);
  var temp = '';
  var arr = [];
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (userInfo.buy.includes(item.id)) {
      arr.push(item);
    }
  });
  arr.forEach((item) => {
    let numberLesson =
      item.number_lesson < 10 ? '0' + item.number_lesson : item.number_lesson;
    temp += `<a class="course-profile-item" href='./course.html?id=${item.id}'>
              <div class="course-profile-img">
                <img
                  src="${item.cover}"
                  alt=""
                />
              </div>
              <div class="course-profile-wrapper">
                <div class="course-profile-info">
                  <div class="course-profile-name">${item.name}</div>
                  <div class="course-profile-teacher">
                    <div class="course-profile-teacher-img">
                      <img src="${item.teacher_avatar}" alt="" />
                    </div>
                    <div class="course-profile-teacher-name">
                    ${item.teacher}
                    </div>
                  </div>
                </div>
                <div class="course-profile-finish">
                  <span>0</span>
                  <span>/${numberLesson}</span>
                </div>
                <div class="course-profile-progress" data-progress="0">
                  <span></span>
                </div>
              </div>
            </a>`;
  });
  studying.innerHTML = temp;
}
renderStudying();

// Render các khoá học đã học
var endStudy = document.querySelector('#end-study');
async function renderEndStudy() {
  var userInfo = getItem('user');
  var temp = '';
  var arr = [];
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (userInfo.end_study.includes(item.id)) {
      arr.push(item);
    }
  });
  arr.forEach((item) => {
    let numberLesson =
      item.number_lesson < 10 ? '0' + item.number_lesson : item.number_lesson;
    temp += `<a class="course-profile-item" href='./course.html?id=${item.id}'>
              <div class="course-profile-img">
                <img
                  src="${item.cover}"
                  alt=""
                />
              </div>
              <div class="course-profile-wrapper">
                <div class="course-profile-info">
                  <div class="course-profile-name">${item.name}</div>
                  <div class="course-profile-teacher">
                    <div class="course-profile-teacher-img">
                      <img src="${item.teacher_avatar}" alt="" />
                    </div>
                    <div class="course-profile-teacher-name">
                    ${item.teacher}
                    </div>
                  </div>
                </div>
                <div class="course-profile-finish-full">
                  <span>${numberLesson}</span>
                  <span>/${numberLesson}</span>
                </div>
                <div class="course-profile-progress" data-progress="100">
                  <span></span>
                </div>
              </div>
            </a>`;
  });
  endStudy.innerHTML = temp;
}

renderEndStudy();

// Chuyển sang trang thanh toán
var paymentBtn = document.querySelector('#payment');
paymentBtn.addEventListener('click', function () {
  var userInfo = getItem('user');
  if (userInfo.cart.length == 0) {
    return;
  } else {
    window.open('./payment.html', '_self');
  }
});

// Render các khoá học đã like
var likeCourse = document.querySelector('#like-course');
async function renderLikeCourse() {
  var userInfo = getItem('user');
  var temp = '';
  var arr = [];
  var data = await getDataFromJSON('./data/subjects.JSON');
  data.forEach((item) => {
    if (userInfo.like.includes(item.id)) {
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
  likeCourse.innerHTML = temp;
}

renderLikeCourse();

// Xoá các khoá học nếu không thích nữa
likeCourse.addEventListener('click', handleDeleteLikeCourse);
function handleDeleteLikeCourse(e) {
  if (e.target.matches('.course-profile-delele i')) {
    e.preventDefault();
    let idCourse = e.target.dataset.id;
    var userInfo = getItem('user');
    userInfo.like.forEach((item, index) => {
      if (item == idCourse) {
        userInfo.like.splice(index, 1);
      }
    });
    setItem('user', userInfo);
    updateAll(userInfo);
    renderLikeCourse();
  }
}
