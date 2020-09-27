'use strict';

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Люк Скайвокер', 'Оби-Ван Кеноби', 'Лея', 'Хан Соло', 'Дарт Вейдер', 'Йода', 'R2-D2', 'Воин Дракона', 'Джекки Чан', 'Бронепух', 'Памелла Андерсон'];
const MOKIES_COUNT = 25;
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 9;

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let getRandomNumberFromMinToMax = function (min, max) {
  let random = Math.floor((Math.random() * (max - min)) + min);
  return random;
};

const getRandomMessge = function (count = getRandomNumberFromMinToMax(0, 2)) {
  if (count === 0) {
    return MESSAGES[getRandomNumberFromMinToMax(0, MESSAGES.length)];
  } else {
    return MESSAGES[getRandomNumberFromMinToMax(0, MESSAGES.length)] + MESSAGES[getRandomNumberFromMinToMax(0, MESSAGES.length)];
  }
};

const getComment = function () {
  let comment = {
    name: NAMES[getRandomNumberFromMinToMax(0, NAMES.length)],
    avatar: 'img/avatar-' + getRandomNumberFromMinToMax(1, AVATAR_COUNT + 1) + '.svg',
    message: getRandomMessge()
  };
  return comment;
};

const getComments = function (count = getRandomNumberFromMinToMax(1, COMMENT_COUNT + 1)) {
  let comments = [];
  for (let i = 0; i <= count - 1; i++) {
    comments.push(getComment());
  }
  return comments;
};

const generateMokie = function () {
  let mokie = {
    photo: 'photos/' + 1 + '.jpg',
    likes: getRandomNumberFromMinToMax(15, 201),
    comments: getComments(),
    description: ''
  };
  return mokie;
};

const generateMokies = function (count = MOKIES_COUNT) {
  let mokies = [];
  for (let i = 0; i <= count - 1; i++) {
    let mokie = generateMokie();
    mokie.photo = 'photos/' + (i + 1) + '.jpg';
    mokies.push(mokie);
  }
  return mokies;
};

const renderMokie = function (mokie) {
  let mokieSimularItem = pictureTemplate.cloneNode(true);
  mokieSimularItem.querySelector('.picture__img').src = mokie.photo;
  mokieSimularItem.querySelector('.picture__likes').textContent = mokie.likes;
  mokieSimularItem.querySelector('.picture__comments').textContent = mokie.comments.length;
  return mokieSimularItem;
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

