var btnChatIcon = document.querySelector('.chat-icon');
var boxChat = document.querySelector('.box-chat');
var minimizeIcon = document.querySelector('.box-minimize');
btnChatIcon.addEventListener('click', function () {
  boxChat.classList.toggle('box-show');
  boxChat.classList.toggle('box-hide');
});
minimizeIcon.addEventListener('click', function () {
  boxChat.classList.remove('box-show');
  boxChat.classList.add('box-hide');
});

// Fake Online
var numberOnline = document.querySelector('.count-online-value');
var num = 999;
setInterval(() => {
  num = Math.floor(Math.random() * 100 + 1000);
  numberOnline.textContent = num;
}, 5000);

// Nghịch tý
var startChat = document.querySelector('.box-chat-button');
var startChatIntro = document.querySelector('.box-chat-content-intro');
var formChat = document.querySelector('.guest-input');
var boxChatContent = document.querySelector('.box-chat-content');

startChat.addEventListener('click', function () {
  startChatIntro.style.display = 'none';
  formChat.style.display = 'flex';
  startChat.style.display = 'none';
  boxChatContent.insertAdjacentHTML(
    'beforeend',
    `<div class="admin-chat loading-chat-temp">
      <div class="admin-chat-avatar">
        <img src="./images/admin.jpg" alt="">
      </div>
      <div class="admin-chat-content">
        <div class="loading-chat">
        <div>
        <span></span>
        <span></span>
        <span></span>
        </div>
        </div>
      </div>
    </div>`
  );
  let loadingChat = document.querySelector('.loading-chat-temp');
  setTimeout(() => {
    loadingChat.remove();
    boxChatContent.insertAdjacentHTML(
      'beforeend',
      `<div class="admin-chat">
        <div class="admin-chat-avatar">
          <img src="./images/admin.jpg" alt="">
        </div>
        <div class="admin-chat-content">
          Hello! My name is Angela Phuong Trinh. Can I help you?
        </div>
      </div>`
    );
  }, 2000);
});

formChat.addEventListener('submit', handleChat);
async function handleChat(e) {
  e.preventDefault();
  let chatValue = document.querySelector('.guest-input-item input');
  chatValue.focus();
  if (chatValue.value.trim().length == 0) return;
  boxChatContent.insertAdjacentHTML(
    'beforeend',
    `<div class="guest-chat"><span>${chatValue.value}</span></div>`
  );
  chatValue.value = '';
  boxChatContent.insertAdjacentHTML(
    'beforeend',
    `<div class="admin-chat loading-chat-temp">
      <div class="admin-chat-avatar">
        <img src="./images/admin.jpg" alt="">
      </div>
      <div class="admin-chat-content">
        <div class="loading-chat">
        <div>
        <span></span>
        <span></span>
        <span></span>
        </div>
        </div>
      </div>
    </div>`
  );
  boxChatContent.scrollTop = boxChatContent.scrollHeight;
  const data = await getChat();
  setTimeout(() => {
    let loadingChat = document.querySelectorAll('.loading-chat-temp');
    loadingChat.forEach((item) => {
      item.remove();
    });
    boxChatContent.insertAdjacentHTML(
      'beforeend',
      `<div class="admin-chat">
      <div class="admin-chat-avatar">
        <img src="./images/admin.jpg" alt="">
      </div>
      <div class="admin-chat-content">
        ${data.text}
      </div>
    </div>`
    );
  }, 2000);
}

// Jokes
// const endpoint = 'https://api.chucknorris.io/jokes/random';
// async function getChat() {
//   const response = await fetch(endpoint);
//   const data = await response.json();
//   return data;
// }
// Quotes
async function getChat() {
  const response = await fetch('https://type.fit/api/quotes');
  const data = await response.json();
  let random = Math.floor(Math.random() * data.length);
  console.log(data[random]);
  return data[random];
}
// getChat();
// Fake - Hiển thị sinh viên mới đăng kí
// Popup New Student
var popUp = document.querySelector('.new-student');
setInterval(() => {
  getStudentRecent();
  popUp.style.animation = 'slide-in-left .5s ease-out both';
  setTimeout(() => {
    popUp.style.animation = 'slide-out-left .5s ease-in both';
  }, 5000);
}, 15000);

var temp = 0;
async function getStudentRecent() {
  var promise = await fetch('./data/newstudents.JSON');
  var data = await promise.json();
  var i = Math.floor(Math.random() * data.length);
  if (temp != i) {
    popUp.innerHTML = `<div class="student-img">
                        <img src="${data[i].cover}" alt="" />
                      </div>
                      <div class="student-content">
                        <div class="student-name">
                          <b>${data[i].name}</b> just signed up for the
                          <b>${data[i].class}</b>
                        </div>
                        <div><b>${data[i].teacher}</b></div>
                        <div class="student-time">Just now</div>
                      </div>`;
    temp = i;
    popUp.href = data[i].course_link;
  }
  // return data[i];
}
