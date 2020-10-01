'use strict';

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Люк Скайвокер', 'Оби-Ван Кеноби', 'Лея', 'Хан Соло', 'Дарт Вейдер', 'Йода', 'R2-D2', 'Воин Дракона', 'Джекки Чан', 'Бронепух', 'Памелла Андерсон'];
const PHOTOS_COUNT = 25;
const AVATAR_COUNT = 6;
const MESSAGES_COUNT = 2;
const COMMENT_COUNT = 9;

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let getRandomNumber = function (min, max) {
  let random = Math.floor((Math.random() * (max - min)) + min);
  return random;
};

const getRandomMessage = function () {
  let randomMessages = [];
  for (let i = 0; i < MESSAGES_COUNT; i++) {
    let random = getRandomNumber(0, MESSAGES.length);
    let randomMessage = MESSAGES[random];
    if (!randomMessages.includes(randomMessage)) {
      randomMessages.push(randomMessage);
    }
  }
  return randomMessages.join(' ');
};

const getComment = function () {
  let comment = {
    name: NAMES[getRandomNumber(0, NAMES.length)],
    avatar: 'img/avatar-' + getRandomNumber(1, AVATAR_COUNT + 1) + '.svg',
    message: getRandomMessage()
  };
  return comment;
};

const getComments = function (count = getRandomNumber(1, COMMENT_COUNT + 1)) {
  let comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(getComment());
  }
  return comments;
};

const generatePhotos = function (count = PHOTOS_COUNT) {
  let pictures = [];
  for (let i = 0; i <= count - 1; i++) {
    let picture = {
      photo: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 201),
      comments: getComments(),
      description: ''
    };
    pictures.push(picture);
  }
  return pictures;
};

const renderPhoto = function (picture) {
  let pictureSimularItem = pictureTemplate.cloneNode(true);
  pictureSimularItem.querySelector('.picture__img').src = picture.photo;
  pictureSimularItem.querySelector('.picture__likes').textContent = picture.likes;
  pictureSimularItem.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureSimularItem;
};

const renderPhotos = function (pictures) {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPhoto(pictures[i]));
  }
  pictureList.appendChild(fragment);
};

const pictures = generatePhotos();
renderPhotos(pictures);

const bigPicture = document.querySelector('.big-picture');

bigPicture.classList.remove('hidden');

const socialCommentsList = document.querySelector('.social__comments');

const createCommentElement = function () {
  let li = document.createElement('li');
  li.classList.add('social__comment');
  return li;
};

const createCommentImg = function (count, obj) {
  let img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = obj.comments[count].avatar;
  img.alt = obj.comments[count].name;
  img.style.width = '35px';
  img.style.height = '35px';
  return img;
};

const createCommentText = function (count, obj) {
  let p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = obj.comments[count].message;
  return p;
};

const createCommentList = function (obj) {
  for (let i = 0; i < obj.comments.length; i++) {
    let newComment = createCommentElement(obj);
    newComment.append(createCommentImg(i, obj));
    newComment.append(createCommentText(i, obj));
    socialCommentsList.append(newComment);
  }
  return socialCommentsList;
};

const createNewPicture = function (obj) {
  socialCommentsList.innerHTML = '';
  bigPicture.querySelector('img').src = obj.photo;
  bigPicture.querySelector('.likes-count').textContent = obj.likes;
  bigPicture.querySelector('.comments-count').textContent = obj.comments.length;
  bigPicture.querySelector('.social__caption').textContent = obj.description;
  createCommentList(obj);
};

// заполняю комментари из моки №1
createNewPicture(pictures[0]);

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');
const commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');
const body = document.querySelector('body');
body.classList.add('modal-open');
