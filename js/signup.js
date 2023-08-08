import { getItem, setItem, checkAllValidate } from './untilities.js';

var form = document.querySelector('.sign-box');
var userName = document.querySelector('#username');
var email = document.querySelector('#email');
var phone = document.querySelector('#phone');
var password = document.querySelector('#password');
var term = document.querySelector('#term');
const reUserName = /^(?=[a-zA-Z0-9._]{0,100}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const reEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const rePhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const rePassWord = /.{0,100}$/;

form.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  checkAllValidate(userName, reUserName, 'Username', 6, 100);
  checkAllValidate(email, reEmail, 'Email', 0, 100);
  checkAllValidate(phone, rePhone, 'Moblie number', 0, 100);
  checkAllValidate(password, rePassWord, 'Password', 8, 100);
  checkUserExit(userName.value, email.value, phone.value);
  getNewUser();
}

userName.addEventListener('input', function () {
  checkAllValidate(userName, reUserName, 'Username', 6, 18);
});
email.addEventListener('input', function () {
  checkAllValidate(email, reEmail, 'Email', 0, 100);
});
phone.addEventListener('input', function () {
  checkAllValidate(phone, rePhone, 'Moblie number', 0, 100);
});
password.addEventListener('input', function () {
  checkAllValidate(password, rePassWord, 'Password', 8, 20);
});

// Ẩn hiện thông tin mật khẩu
var showPassWordBtn = document.querySelector('.show-password');
showPassWordBtn.addEventListener('click', function () {
  this.firstElementChild.classList.toggle('bi-eye');
  this.firstElementChild.classList.toggle('bi-eye-slash');
  if (this.firstElementChild.classList.contains('bi-eye')) {
    password.type = 'text';
  } else password.type = 'password';
});

// Lấy thông tin đăng nhập
var loading = document.querySelector('.loading');
function getNewUser() {
  var users = getItem('users');
  var user = {};
  if (term.checked == false) {
    term.parentElement.nextElementSibling.textContent =
      '*Please agree to the website terms and conditions';
  }
  if (
    !checkAllValidate(userName, reUserName, 'Username', 6, 18) &&
    !checkAllValidate(email, reEmail, 'Email', 0, 100) &&
    !checkAllValidate(phone, rePhone, 'Moblie number', 0, 100) &&
    !checkAllValidate(password, rePassWord, 'Password', 8, 20) &&
    !checkUserExit(userName.value, email.value, phone.value) &&
    term.checked == true
  ) {
    user.name = userName.value;
    user.email = email.value;
    user.phone = phone.value;
    user.password = password.value;
    user.avatar = './images/user.png';
    user.fullname = '';
    user.birth = '2022-02-02';
    user.address = '';
    user.desc = '';
    user.buy = [];
    user.cart = [];
    user.like = [];
    users.push(user);
    setItem('users', users);
    // return user;
    loading.style.display = 'flex';
    setTimeout(() => {
      loading.style.display = 'none';
      window.open('./signin.html', '_self');
    }, 500);
    return user;
  }
  return;
}

term.addEventListener('change', function () {
  if (!term.checked) {
    term.parentElement.nextElementSibling.textContent =
      '*Please agree to the website terms and conditions';
  } else term.parentElement.nextElementSibling.innerHTML = '&nbsp;';
});

// Check đã tồn tại tài khoản chưa
function checkUserExit(nameNew, emailNew, phoneNew) {
  var temp = false;
  var users = getItem('users');
  users.forEach((item) => {
    if (item.name == nameNew) {
      userName.parentElement.nextElementSibling.textContent =
        '*This account already exists';
      temp = true;
    }
    if (item.email == emailNew) {
      email.parentElement.nextElementSibling.textContent =
        '*This email already exists';
      temp = true;
    }
    if (item.phone == phoneNew) {
      phone.parentElement.nextElementSibling.textContent =
        '*This phone number already exists';
      temp = true;
    }
  });
  return temp;
}
