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

// bigPicture.classList.remove('hidden');

const socialCommentsList = document.querySelector('.social__comments');

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
createNewPicture(pictures[0]);

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
const UploadEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
const effectLevelLine = UploadEffectLevel.querySelector('.effect-level__line');
const effectLevelPin = UploadEffectLevel.querySelector('.effect-level__pin');
const effectLevelDepth = UploadEffectLevel.querySelector('.effect-level__depth');

const resetValues = function (evt) {
  let effect = evt.target.value;
  imgUploadPreview.className = '';
  imgUploadPreview.classList.add('effects__preview--' + effect);
  if (effect === 'none') {
    UploadEffectLevel.classList.add('hidden');
  } else {
    UploadEffectLevel.classList.remove('hidden');
  }

  effectLevelPin.style = "left: " + 100 + "%";
  effectLevelDepth.style = "width: " + 100 + "%";

  switch (effect) {
    case 'chrome':
      imgUploadPreview.style = "filter: grayscale(" + 1 + ")";
      break;
    case 'sepia':
      imgUploadPreview.style = "filter: sepia(" + 1 + ")";
      break;
    case 'invert':
      imgUploadPreview.style = "filter: invert(" + 100 + "%)";
      break;
    case 'blur':
      imgUploadPreview.style = "filter: blur(" + 3 + "px)";
      break;
    case 'brightness':
      imgUploadPreview.style = "filter: brightness(" + 3 + ")";
      break;
    default:
      imgUploadPreview.style = "";
      break;
  }

  return effectLevelPin.style;
};

effectList.addEventListener('change', function (evt) {
  resetValues(evt);
});

const getEffectValue = function () {
  const lineWidthInPx = 452;
  const lineWidthInPercent = 100;
  const maxBlurValue = 4 / lineWidthInPercent;
  const maxBrightnessValue = 3 / lineWidthInPercent;

  effectLevelLine.addEventListener('mouseup', function (evt) {
    effectLevelPin.blur();
    effectLevelLine.focus();
    let countValue = Math.floor(evt.offsetX / (lineWidthInPx / lineWidthInPercent));
    effectLevelPin.style = "left: " + countValue + "%";
    effectLevelDepth.style = "width: " + countValue + "%";

    if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.style = "filter: grayscale(" + countValue / lineWidthInPercent + ")";
    } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.style = "filter: sepia(" + countValue / lineWidthInPercent + ")";
    } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.style = "filter: invert(" + countValue + "%)";
    } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.style = "filter: blur(" + countValue * maxBlurValue + "px)";
    } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
      imgUploadPreview.style = "filter: brightness(" + countValue * maxBrightnessValue + ")";
    }
    return effectLevelPin.style;
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
  const minValue = 2;
  const maxValue = 20;

  const generateUnicArr = function (arr = tagsArr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      let el = arr[i];
      if (!newArr.includes(el)) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  };

  const checkValidationInput = function (newArr = generateUnicArr(), arr = tagsArr) {
    for (let i = 0; i < arr.length; i++) {
      let tag = arr[i];
      let sharp = tag.substring(0, 1);
      let tagHatchback = tag.substring(1, tag.length);
      if (sharp !== '#') {
        textHashtags.setCustomValidity('ХэшТеги должны начинаться с "#"');
      } else if (tagHatchback.includes('#') || tagHatchback.includes('@') || tagHatchback.includes('$') || tagHatchback.includes('<') || tagHatchback.includes('>') || tagHatchback.includes('%') || tagHatchback.includes('.') || tagHatchback.includes('!') || tagHatchback.includes('?') || tagHatchback.includes('"') || tagHatchback.includes('\'') || tagHatchback.includes('&') || tagHatchback.includes('|') || tagHatchback.includes('\\') || tagHatchback.includes('§') || tagHatchback.includes('¶') || tagHatchback.includes('+') || tagHatchback.includes('-') || tagHatchback.includes('=') || tagHatchback.includes('*') || tagHatchback.includes('/')) {
        textHashtags.setCustomValidity('ХэшТеги не должны содержать спецсимволы (#, @, $ и т. п.), знаки пунктуации, эмодзи и т.п.');
      } else if (tagHatchback.length + 1 < minValue) {
        textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (tagHatchback.length + 1 > maxValue) {
        textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (arr.length > newArr.length) {
        textHashtags.setCustomValidity('хэштеги не должны повторяться');
      } else if (inputValue.includes(',')) {
        textHashtags.setCustomValidity('ХэшТеги должны разделяться пробелом, а не ","');
      } else {
        textHashtags.setCustomValidity('');
      }
    }
  };

  // const checkValidationInput1 = function (newArr = generateUnicArr(), arr = tagsArr) {
  //   for (let i = 0; i < arr.length; i++) {

  //     let tagArr = arr[i].split('');
  //     let sharp = tagArr.shift();

  //     if (sharp !== String('#')) {
  //       textHashtags.setCustomValidity('ХэшТеги должны начинаться с "#"');
  //     } else if (tagArr.includes('#') || tagArr.includes('@') || tagArr.includes('$') || tagArr.includes('<') || tagArr.includes('>') || tagArr.includes('%') || tagArr.includes('.') || tagArr.includes('!') || tagArr.includes('?') || tagArr.includes('"') || tagArr.includes('\'') || tagArr.includes('&') || tagArr.includes('|') || tagArr.includes('\\') || tagArr.includes('§') || tagArr.includes('¶') || tagArr.includes('+') || tagArr.includes('-') || tagArr.includes('=') || tagArr.includes('*') || tagArr.includes('/')) {
  //       textHashtags.setCustomValidity('ХэшТеги не должны содержать спецсимволы (#, @, $ и т. п.), знаки пунктуации, эмодзи и т.п.');
  //     } else if (tagArr.length + 1 < minValue) {
  //       textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
  //     } else if (tagArr.length + 1 > maxValue) {
  //       textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
  //     } else if (arr.length > newArr.length) {
  //       textHashtags.setCustomValidity('хэштеги не должны повторяться');
  //     } else if (inputValue.includes(',')) {
  //       textHashtags.setCustomValidity('ХэшТеги должны разделяться пробелом, а не ","');
  //     } else {
  //       textHashtags.setCustomValidity('');
  //     }
  //   }
  // };

  checkValidationInput();
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

