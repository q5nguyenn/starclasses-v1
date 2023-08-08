async function getData() {
  var promise = await fetch('./data/courses.JSON');
  var data = await promise.json();
  console.log('🚀 ~ getData ~ data', data);
  return data;
}

var xxx = `<div class="tab-item">
            <i class="bi bi-translate"></i>
            <span>Ngoại xxx/span>
            </div>`;
insertDataToObject(xxx, 'tab-items');
function insertDataToObject(data, classname) {
  let classX = document.querySelector(`.${classname}`);
  classX.insertAdjacentHTML('beforeend', data);
}
