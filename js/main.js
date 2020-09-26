'use strict';

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
// const NAMES = ['Люк Скайвокер', 'Оби-Ван Кеноби', 'Лея', 'Хан Соло', 'Дарт Вейдер', 'Йода', 'R2-D2', 'Воин Дракона', 'Джекки Чан', 'Бронепух', 'Памелла Андерсон'];
const MOKIES_COUNT = 25;

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let getRandomNumber = function (min, max) {
  let random = Math.floor((Math.random() * (max - min)) + min);
  return random;
};

let url = 0;
const getUrl = function () {
  url = url + 1;
  return url;
};

const getRandomMessge = function () {
  return MESSAGES[getRandomNumber(0, MESSAGES.length)];
};

const getRandomMessages = function (count = getRandomNumber(1, 9)) {
  let randomMessages = [];
  for (let i = 0; i < count; i++) {
    randomMessages.push(getRandomMessge());
  }
  return randomMessages;
};

const generateMokie = function () {
  let mokie = {
    photo: 'photos/' + getUrl() + '.jpg',
    avatar: 'img/avatar-' + getRandomNumber(1, 7) + '.svg',
    likes: getRandomNumber(15, 201),
    message: getRandomMessages(),
    name: '',
    description: ''
  };
  return mokie;
};

const renderMokie = function (mokie) {
  let mokieSimularItem = pictureTemplate.cloneNode(true);
  mokieSimularItem.querySelector('.picture__img').src = mokie.photo;
  mokieSimularItem.querySelector('.picture__likes').textContent = mokie.likes;
  mokieSimularItem.querySelector('.picture__comments').textContent = mokie.message.length;
  return mokieSimularItem;
};

const generateMokies = function (count = MOKIES_COUNT) {
  let mokies = [];
  for (let i = 0; i <= count - 1; i++) {
    mokies.push(generateMokie());
  }
  return mokies;
};

const renderMokies = function (mokies) {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < mokies.length; i++) {
    fragment.appendChild(renderMokie(mokies[i]));
  }
  pictureList.appendChild(fragment);
};

const mokies = generateMokies();
renderMokies(mokies);

