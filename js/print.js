var printBill = document.querySelector('#print-bill');
printBill.addEventListener('click', printDiv);

function printDiv() {
  // var divContents = document.body.innerHTML;
  var divContentTop = document.querySelector('.print').innerHTML;
  var divContentBody = document.querySelector('.course-in-cart').innerHTML;
  var divContentBot = document.querySelector('.pay-payment').innerHTML;
  // console.log(divContents);
  var a = window.open('', '', 'height=500, width=500');
  a.document.write('<html>');
  a.document.write(
    `<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Star Classes - Payment</title>
    <link rel="icon" type="image/x-icon" href="./images/x-icon.ico" />
    <link rel="stylesheet" href="./css/style.css" />
    <link rel="stylesheet" href="./css/payment.css" />
    <link rel="stylesheet" href="./css/print.css" />
  </head>`
  );
  a.document.write(
    `<main>
      <div class="pay-wrapper">`
  );
  a.document.write(divContentTop);
  a.document.write(divContentBody);
  a.document.write(`<div class="pay-item pay-payment">`);
  a.document.write(divContentBot);
  a.document.write(`</div>`);

  a.document.write(
    `</div>
    </main>`
  );
  a.document.write('</html>');
  a.document.close(); // necessary for IE >= 10
  a.focus(); // necessary for IE >= 10*/
  // a.print();
  setTimeout(function () {
    a.print();
    // a.close();
  }, 1000);
  return true;
}

var time = new Date().toLocaleString('vi-VI');
var billDate = document.querySelector('#bill-date');
billDate.innerHTML = `Date: <b>${time}</b>`;
