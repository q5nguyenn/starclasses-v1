import { getItem, setItem } from './untilities.js';

var form = document.querySelector('.sign-box');
var userName = document.querySelector('#username');
var password = document.querySelector('#password');
var showPassWordBtn = document.querySelector('#checkbox1');
const nowUser = localStorage.getItem('user');

// Handle Submit
form.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  checkAllValidate(userName, 'User name');
  checkAllValidate(password, 'Password');
  userWrong(userName.value, password.value);
  userNow();
}

function checkAllValidate(item, alert) {
  if (!item.value || item.value.trim().length == 0) {
    item.parentElement.nextElementSibling.textContent =
      '*' + alert + ' field cannot be left blank.';
    return true;
  } else {
    item.parentElement.nextElementSibling.innerHTML = '&nbsp';
    return false;
  }
}

// Ẩn hiện thông tin mật khẩu
showPassWordBtn.addEventListener('click', function () {
  if (showPassWordBtn.checked == true) {
    password.type = 'text';
  } else password.type = 'password';
});

// Tạo phiên đăng nhập
var loading = document.querySelector('.loading');
function userNow() {
  var users = getItem('users');
  if (
    !checkAllValidate(userName, 'User name') &&
    !checkAllValidate(password, 'Password') &&
    !userWrong(userName.value, password.value)
  ) {
    setItem('login', true);
    users.forEach((item) => {
      if (item.name == userName.value) {
        setItem('user', item);
      }
    });
    loading.style.display = 'flex';
    setTimeout(() => {
      loading.style.display = 'none';
      if (
        document.referrer.indexOf('signup.html') > 0 ||
        document.referrer.indexOf('forgot-password.html') > 0
      ) {
        window.open('./index.html', '_self');
      } else window.open(document.referrer, '_self');
    }, 500);
  }
  return;
}

// Check đã tồn tại tài khoản chưa
function userWrong(user_Name, user_Password) {
  var temp = true;
  var users = getItem('users');
  users.forEach((item) => {
    if (item.name == user_Name && item.password == user_Password) {
      temp = false;
    }
  });
  if (temp) {
    userName.parentElement.nextElementSibling.textContent =
      '*The username or password is incorrect';
  }
  return temp;
}
