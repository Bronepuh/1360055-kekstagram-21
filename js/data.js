'use strict';
(function () {
  const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  const NAMES = ['Люк Скайвокер', 'Оби-Ван Кеноби', 'Лея', 'Хан Соло', 'Дарт Вейдер', 'Йода', 'R2-D2', 'Воин Дракона', 'Джекки Чан', 'Бронепух', 'Памелла Андерсон'];
  const PHOTOS_COUNT = 25;
  const AVATAR_COUNT = 6;
  const MESSAGES_COUNT = 2;
  const COMMENT_COUNT = 9;

  const getRandomMessage = function () {
    let randomMessages = [];
    for (let i = 0; i < MESSAGES_COUNT; i++) {
      let random = window.util.random(0, MESSAGES.length);
      let randomMessage = MESSAGES[random];
      if (!randomMessages.includes(randomMessage)) {
        randomMessages.push(randomMessage);
      }
    }
    return randomMessages.join(' ');
  };

  const getComment = function () {
    let comment = {
      name: NAMES[window.util.random(0, NAMES.length)],
      avatar: 'img/avatar-' + window.util.random(1, AVATAR_COUNT + 1) + '.svg',
      message: getRandomMessage()
    };
    return comment;
  };

  const getComments = function (count = window.util.random(1, COMMENT_COUNT + 1)) {
    let comments = [];
    for (let i = 0; i < count; i++) {
      comments.push(getComment());
    }
    return comments;
  };

  const generatePictures = function (count = PHOTOS_COUNT) {
    let pictures = [];
    for (let i = 0; i <= count - 1; i++) {
      let picture = {
        photo: 'photos/' + (i + 1) + '.jpg',
        likes: window.util.random(15, 201),
        comments: getComments(),
        description: ''
      };
      pictures.push(picture);
    }
    return pictures;
  };

  window.data = generatePictures();
})();
