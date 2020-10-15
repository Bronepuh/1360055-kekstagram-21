'use strict';

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Люк Скайвокер', 'Оби-Ван Кеноби', 'Лея', 'Хан Соло', 'Дарт Вейдер', 'Йода', 'R2-D2', 'Воин Дракона', 'Джекки Чан', 'Бронепух', 'Памелла Андерсон'];
const PHOTOS_COUNT = 25;
const AVATAR_COUNT = 6;
const MESSAGES_COUNT = 2;
const COMMENT_COUNT = 9;

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const bigPicture = document.querySelector('.big-picture');
const socialCommentsList = document.querySelector('.social__comments');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

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

// bigPicture.classList.remove('hidden');

const generateCommentElement = function (comment) {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.style.width = '35px';
  img.style.height = '35px';

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = comment.message;

  li.append(img);
  li.append(p);
  return li;
};

const generateCommentList = function (comments) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    let newComment = generateCommentElement(comments[i]);
    fragment.append(newComment);
  }
  return fragment;
};

const createNewPicture = function (picture) {
  bigPicture.querySelector('img').src = picture.photo;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  socialCommentsList.innerHTML = '';
  socialCommentsList.append(generateCommentList(picture.comments));
};

// заполняю комментари из моки №1
// createNewPicture(pictures[0]);

// ======================================================================================== module4-task2

for (let i = 0; i < PHOTOS_COUNT; i++) {
  let picture = pictures[i];
  createNewPicture(picture);
}

const onBigPictureEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const onBigPictureEnterPress = function (evt) {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    let src = evt.target.querySelector('img').src;
    bigPicture.querySelector('img').src = src;
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
  }
};

const openBigPicture = function (evt) {
  let src = evt.target.src;
  bigPicture.querySelector('img').src = src;
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureEscPress);
};

pictureList.addEventListener('click', function (evt) {
  openBigPicture(evt);
});

pictureList.addEventListener('keydown', onBigPictureEnterPress);

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

bigPictureClose.addEventListener('click', function () {
  closeBigPicture();
});

// =========================================================================================================

const socialCommentCount = bigPicture.querySelector('.social__comment-count');
socialCommentCount.classList.add('hidden');
const commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');
const body = document.querySelector('body');
// body.classList.add('modal-open');

// module4-task1
// открытие и закрытие окна для редактирования загружаемой фотографии
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadOverlayCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

const onUploadPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    uploadFileInput.value = '';
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openUploadPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadPopupEscPress);
};

uploadFileInput.addEventListener('change', function () {
  openUploadPopup();
});

const closeUploadPopup = function () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadPopupEscPress);
};

imgUploadOverlayCancel.addEventListener('click', function () {
  closeUploadPopup();
});

// Изменение размера изображения
const MIN_VALUE = 0;
const MAX_VALUE = 100;
const STEP = 25;
const imgUploadScaleContol = imgUploadForm.querySelector('.img-upload__scale');
const controlSmaller = imgUploadScaleContol.querySelector('.scale__control--smaller');
const controlBigger = imgUploadScaleContol.querySelector('.scale__control--bigger');
const controlInput = imgUploadScaleContol.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');

const getNumberOfInput = function () {
  let number = parseInt(controlInput.value, 10);
  return number;
};

const changeSizePreview = function () {
  imgUploadPreview.style = 'transform: scale(' + getNumberOfInput() / 100 + ')';
};

const pushControlSmaller = function (value = MIN_VALUE) {
  let number = getNumberOfInput();
  if (number > value) {
    controlInput.value = String((number - STEP) + '%');
    changeSizePreview();
  }
  return controlInput.value;
};

const pushControlBigger = function (value = MAX_VALUE) {
  let number = getNumberOfInput();
  if (number < value) {
    controlInput.value = String((number + STEP) + '%');
    changeSizePreview();
  }
  return controlInput.value;
};

controlSmaller.addEventListener('click', function () {
  pushControlSmaller();
});

controlBigger.addEventListener('click', function () {
  pushControlBigger();
});

// наложение эффекта на изображение
const effectList = imgUploadForm.querySelector('.effects__list');
const uploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectLevelLine = uploadEffectLevel.querySelector('.effect-level__line');
const effectLevelPin = uploadEffectLevel.querySelector('.effect-level__pin');
const effectLevelDepth = uploadEffectLevel.querySelector('.effect-level__depth');

const MAX_BLUR_VALUE = 4;
const MAX_BRIGHTNESS_VALUE = 3;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;

const setEffect = function (effect, value) {
  imgUploadPreview.className = '';
  imgUploadPreview.classList.add('effects__preview--' + effect);

  switch (effect) {
    case 'chrome':
      imgUploadPreview.style = "filter: grayscale(" + value + ")";
      break;
    case 'sepia':
      imgUploadPreview.style = "filter: sepia(" + value + ")";
      break;
    case 'marvin':
      imgUploadPreview.style = "filter: invert(" + (value * 100) + "%)";
      break;
    case 'phobos':
      imgUploadPreview.style = "filter: blur(" + value * MAX_BLUR_VALUE + "px)";
      break;
    case 'heat':
      imgUploadPreview.style = "filter: brightness(" + value * MAX_BRIGHTNESS_VALUE + ")";
      break;
    default:
      imgUploadPreview.style = "";
      break;
  }
};

let currentEffect = 'none';

const onChangeEffect = function (evt) {
  let effect = evt.target.value;

  if (effect === 'none') {
    uploadEffectLevel.classList.add('hidden');
  } else {
    uploadEffectLevel.classList.remove('hidden');
  }

  effectLevelPin.style = "left: " + 100 + "%";
  effectLevelDepth.style = "width: " + 100 + "%";

  currentEffect = effect;

  setEffect(effect, 1);
};

effectList.addEventListener('change', function (evt) {
  onChangeEffect(evt);
});

const getEffectValue = function () {
  const lineWidthInPx = 452;

  effectLevelLine.addEventListener('mouseup', function (evt) {
    effectLevelPin.blur();
    effectLevelLine.focus();
    const currentEffectValue = evt.offsetX / lineWidthInPx;
    effectLevelPin.style = "left: " + Math.floor(currentEffectValue * 100) + "%";
    effectLevelDepth.style = "width: " + Math.floor(currentEffectValue * 100) + "%";
    setEffect(currentEffect, currentEffectValue);
  });
};

effectLevelPin.addEventListener('focus', function () {
  getEffectValue();
  effectLevelPin.blur();
  effectLevelLine.focus();
});

effectLevelPin.removeEventListener('blur', getEffectValue);

effectLevelLine.addEventListener('click', function () {
  getEffectValue();
});

effectLevelLine.removeEventListener('blur', getEffectValue);

// хэш-теги и текстареа
const imgUploadText = imgUploadForm.querySelector('.img-upload__text');
const textHashtags = imgUploadText.querySelector('.text__hashtags');
const imgUploadDescription = imgUploadText.querySelector('.text__description');

textHashtags.addEventListener('input', function () {
  const inputValue = textHashtags.value;
  const tagsArr = inputValue.split(' ');


  const hasDuplicates = function (items) {
    let unicItems = [];
    for (let i = 0; i < items.length; i++) {
      let el = items[i];
      if (unicItems.includes(el)) {
        return true;
      }
      unicItems.push(el);
    }
    return false;
  };

  const checkValidationInput = function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let tag = arr[i];
      let tagHatchback = tag.substring(1, tag.length);
      if (tag[0] !== '#') {
        textHashtags.setCustomValidity('ХэшТеги должны начинаться с "#"');
      } else if (tagHatchback.includes('#') || tagHatchback.includes('@') || tagHatchback.includes('$') || tagHatchback.includes('<') || tagHatchback.includes('>') || tagHatchback.includes('%') || tagHatchback.includes('.') || tagHatchback.includes('!') || tagHatchback.includes('?') || tagHatchback.includes('"') || tagHatchback.includes('\'') || tagHatchback.includes('&') || tagHatchback.includes('|') || tagHatchback.includes('\\') || tagHatchback.includes('§') || tagHatchback.includes('¶') || tagHatchback.includes('+') || tagHatchback.includes('-') || tagHatchback.includes('=') || tagHatchback.includes('*') || tagHatchback.includes('/')) {
        textHashtags.setCustomValidity('ХэшТеги не должны содержать спецсимволы (#, @, $ и т. п.), знаки пунктуации, эмодзи и т.п.');
      } else if (tag.length < MIN_HASHTAG_LENGTH) {
        textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (tag.length > MAX_HASHTAG_LENGTH) {
        textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (hasDuplicates(arr)) {
        textHashtags.setCustomValidity('хэштеги не должны повторяться');
      } else if (inputValue.includes(',')) {
        textHashtags.setCustomValidity('ХэшТеги должны разделяться пробелом, а не ","');
      } else {
        textHashtags.setCustomValidity('');
      }
    }
  };

  checkValidationInput(tagsArr);
});

textHashtags.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadPopupEscPress);
});

textHashtags.addEventListener('blur', function () {
  document.addEventListener('keydown', onUploadPopupEscPress);
});

imgUploadDescription.addEventListener('focus', function () {
  document.removeEventListener('keydown', onUploadPopupEscPress);
});

imgUploadDescription.addEventListener('blur', function () {
  document.addEventListener('keydown', onUploadPopupEscPress);
});
