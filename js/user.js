import { getItem, setItem } from './untilities.js';

var users = [
  {
    id: '0',
    name: 'quy',
    fullname: 'Nguyễn Văn Quý',
    email: 'q5nguyenn@gmail.com',
    birth: '2022-02-26',
    phone: '0986295956',
    address: 'Thái Bình',
    password: '123456',
    avatar: './images/user.png',
    desc: 'Lối nhỏ - Đen vâu',
    buy: ['2', '5', '8'],
    cart: ['3', '6', '9'],
    like: ['10', '12'],
    study: ['2'],
    end_study: ['5', '8'],
  },
  {
    id: '1',
    name: 'haihai',
    fullname: '',
    email: 'q5nguyenn@gmail.com',
    birth: '2022-02-26',
    phone: '0986295956',
    address: 'Thái Bình',
    password: '123456',
    avatar: './images/user.png',
    desc: 'Lối nhỏ - Đen vâu',
    buy: [],
    cart: [],
    like: [],
    study: [],
    end_study: [],
  },
  {
    id: '2',
    name: 'bababa',
    fullname: 'Nguyễn Văn Quý',
    email: 'q5nguyenn@gmail.com',
    birth: '2022-02-26',
    phone: '0986295956',
    address: 'Thái Bình',
    password: '123456',
    avatar: './images/user.png',
    desc: 'Lối nhỏ - Đen vâu',
    buy: [],
    cart: [],
    like: [],
    study: [],
    end_study: [],
  },
  {
    id: '3',
    name: 'bonbon',
    fullname: 'Nguyễn Văn Quý',
    email: 'q5nguyenn@gmail.com',
    birth: '2022-02-26',
    phone: '0986295956',
    address: 'Thái Bình',
    password: '123456',
    avatar: './images/user.png',
    desc: 'Lối nhỏ - Đen vâu',
    buy: [],
    cart: [],
    like: [],
    study: [],
    end_study: [],
  },
  {
    id: '4',
    name: 'namnam',
    fullname: 'Nguyễn Văn Quý',
    email: 'q5nguyenn@gmail.com',
    birth: '2022-02-26',
    phone: '0986295956',
    address: 'Thái Bình',
    password: '123456',
    avatar: './images/user.png',
    desc: 'Lối nhỏ - Đen vâu',
    buy: [],
    cart: [],
    like: [],
    study: [],
    end_study: [],
  },
  {
    id: '5',
    name: 'sausau',
    fullname: 'Nguyễn Văn Quý',
    email: 'q5nguyenn@gmail.com',
    birth: '2022-02-26',
    phone: '0986295956',
    address: 'Thái Bình',
    password: '123456',
    avatar: './images/user.png',
    desc: 'Lối nhỏ - Đen vâu',
    buy: [],
    cart: [],
    like: [],
    study: [],
    end_study: [],
  },
];

const login = localStorage.getItem('login');
if (!login) {
  setItem('login', false);
}

const usersData = localStorage.getItem('users');
if (!usersData) {
  setItem('users', users);
}

// Bug
if (login == true) {
  var user = getItem('user');
  if (user.cart[0] == null) {
    user.cart.shift();
    setItem('user', user);
  }
}

// Hàm tạo Random ID
function getRandomId(arr) {
  let id;
  let listIds = arr.map((item) => {
    return item.id;
  });
  do {
    id = Math.random().toString(16).slice(10);
  } while (listIds.includes(id));
  return id;
}
