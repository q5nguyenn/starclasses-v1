import { getItem, setItem, checkAllValidate } from './untilities.js';

var form = document.querySelector('.sign-box');
var email = document.querySelector('#email');
const reEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

var popupRepass = document.querySelector('.popup-repassword');
console.log(popupRepass);
form.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
  e.preventDefault();
  checkAllValidate(email, reEmail, 'Email', 0, 100);
  checkUserExit(email.value);
  if (
    !checkAllValidate(email, reEmail, 'Email', 0, 100) &&
    checkUserExit(email.value)
  ) {
    popupRepass.style.display = 'flex';
    setTimeout(() => {
      window.open('./index.html', '_self');
    }, 3000);
  }
}

email.addEventListener('input', function () {
  checkAllValidate(email, reEmail, 'Email', 0, 100);
});

// Check đã tồn tại tài khoản chưa
function checkUserExit(emailNew) {
  var temp = false;
  var users = getItem('users');
  users.forEach((item) => {
    if (item.email == emailNew) {
      temp = true;
    }
  });
  if (temp == false) {
    email.nextElementSibling.textContent = '*This email is not registered';
  }
  return temp;
}
