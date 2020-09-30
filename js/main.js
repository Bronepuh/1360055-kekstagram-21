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
const socialCommentsList = document.querySelector('.social__comments');

// удаляю все комментарии вручную
const socialItemDel = function () {
  const socialItem = socialCommentsList.querySelector('.social__comment');
  socialItem.parentNode.removeChild(socialItem);
};

socialItemDel();
socialItemDel();

bigPicture.classList.remove('hidden');
bigPicture.querySelector('img').src = pictures[0].photo;
bigPicture.querySelector('.likes-count').textContent = pictures[0].likes;
bigPicture.querySelector('.comments-count').textContent = pictures[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = pictures[0].description;

const newCommentItem = function () {
  let li = document.createElement('li');
  li.classList.add('social__comment');
  return li;
};

const newCommentImg = function (count) {
  let img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = pictures[0].comments[count].avatar;
  img.alt = pictures[0].comments[count].name;
  img.style.width = 35 + 'px';
  img.style.height = 35 + 'px';
  return img;
};

const newCommentText = function (count) {
  let p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = pictures[0].comments[count].message;
  return p;
};

const newCommentElements = function () {
  for (let i = 0; i < pictures[0].comments.length; i++) {
    let newComment = newCommentItem();
    newComment.append(newCommentImg(i));
    newComment.append(newCommentText(i));
    socialCommentsList.append(newComment);
  }
  return socialCommentsList;
};

// заполняю комментари из моки №1
newCommentElements();

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');
const commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');
const body = document.querySelector('body');
body.classList.add('modal-open');
