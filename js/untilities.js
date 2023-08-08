export {
  getItem,
  setItem,
  updateAll,
  checkAllValidate,
  xoa_dau,
  getTemplStar,
  getDataFromJSON,
  loading,
  debounce,
  coverStringToFormat,
};

// Chuyển String -> Obj từ LOCAL STORAGE
function getItem(item) {
  return JSON.parse(localStorage.getItem(item));
}

// Chuyển Obj -> String lưu vào LOCAL STORAGE
function setItem(item, obj) {
  localStorage.setItem(item, JSON.stringify(obj));
}

// Cập nhật User vào Data
function updateAll(user) {
  var users = getItem('users');
  users.forEach((item) => {
    if (item.name == user.name) {
      for (let key in item) {
        item[key] = user[key];
      }
    }
  });
  setItem('users', users);
}

function checkAllValidate(item, regex, alert, min, max) {
  if (!item.value || item.value.trim().length == 0) {
    item.parentElement.nextElementSibling.textContent =
      '*' + alert + ' field cannot be left blank.';
    return true;
  } else if (!regex.test(item.value.trim())) {
    item.parentElement.nextElementSibling.textContent =
      '*' + alert + ' is invalid';
    return true;
  } else if (item.value.trim().length < min || item.value.trim().length > max) {
    item.parentElement.nextElementSibling.textContent = `*${alert} must contain at least ${min}  and ${max} characters.`;
    return true;
  } else {
    item.parentElement.nextElementSibling.innerHTML = '&nbsp;';
    return false;
  }
}

// Xoá dấu trong tiếng Việt
function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str;
}

// Tạo ra Star từ điểm
function getTemplStar(point) {
  let tempStar = '';
  if (point == 5) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i>`;
  } else if (point >= 4.5) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-half"></i>`;
  } else if (point >= 4) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star"></i>`;
  } else if (point >= 3.5) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-half"></i
    ><i class="bi bi-star"></i>`;
  } else if (point >= 3.0) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i>`;
  } else if (point >= 2.5) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star-half"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i>`;
  } else if (point >= 2.0) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star-fill"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i>`;
  } else if (point >= 1.5) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star-half"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i>`;
  } else if (point >= 1) {
    tempStar = `<i class="bi bi-star-fill"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i>`;
  } else if (point >= 0.5) {
    tempStar = `<i class="bi bi-star-half"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i>`;
  } else if (point >= 0) {
    tempStar = `<i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i
    ><i class="bi bi-star"></i>`;
  }
  return tempStar;
}

// getdata
async function getDataFromJSON(endpoint) {
  var promise = await fetch(endpoint);
  var data = await promise.json();
  return data;
}

// Loading giả
function loading() {
  var loading = document.querySelector('.loading');
  loading.style.display = 'flex';
  setTimeout(() => {
    loading.style.display = 'none';
  }, 500);
}

// Debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Xoa dau tieng viet chuyen thanh dang don thuan
function coverStringToFormat(string) {
  return xoa_dau(string).toLowerCase().replace(/ /g, '-');
}
