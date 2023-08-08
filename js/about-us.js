var closeBtn = document.querySelector('.popup-admin-close');
var popupAdmin = document.querySelector('.popup-admin');
var popupAdminAvatar = document.querySelector('.popup-admin-avatar img');
var popupAdminName = document.querySelector('.popup-admin-name');
var popupAdminJob = document.querySelector('.popup-admin-job');
console.log(popupAdminAvatar);
var adminItem = document.querySelectorAll('.about-us-item');
closeBtn.addEventListener('click', handleClosePopupAdmin);
function handleClosePopupAdmin() {
  popupAdmin.style.display = 'none';
}

adminItem.forEach((item) => {
  item.addEventListener('click', function (e) {
    let img =
      e.target.previousElementSibling.previousElementSibling.firstElementChild
        .src;
    let name =
      e.target.previousElementSibling.firstElementChild.firstElementChild
        .textContent;
    let job =
      e.target.previousElementSibling.firstElementChild.firstElementChild
        .nextElementSibling.textContent;
    popupAdminAvatar.src = img;
    popupAdminName.textContent = name;
    popupAdminJob.textContent = job;
    popupAdmin.style.display = 'flex';
  });
});

popupAdmin.addEventListener('click', function (e) {
  if (e.target.matches('.popup-admin')) {
    popupAdmin.style.display = 'none';
  }
});

var facebookAdmin = document.querySelectorAll('.about-us-item-social i');

facebookAdmin.forEach((item) => {
  item.addEventListener('click', function () {
    window.open('https://www.facebook.com/', '_self');
  });
});
