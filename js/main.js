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
// body.classList.add('modal-open');

// module4-task1
// открытие и закрытие окна для редактирования загружаемой фотографии
const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = imgUploadForm.querySelector('#upload-file');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadOverlayCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

const onUploadPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    uploadFile.value = '';
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openUploadPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadPopupEscPress);
};

uploadFile.addEventListener('change', function () {
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
  let str = controlInput.value;
  let strArr = str.split('%');
  let number = strArr[0];
  return Number(number);
};

const pushControlSmaller = function (value = MIN_VALUE) {
  let number = getNumberOfInput();
  if (number > value) {
    controlInput.value = String((number - STEP) + '%');
    imgUploadPreview.style = 'transform: scale(' + getNumberOfInput() / 100 + ')';
  }
  return controlInput.value;
};

const pushControlBigger = function (value = MAX_VALUE) {
  let number = getNumberOfInput();
  if (number < value) {
    controlInput.value = String((number + STEP) + '%');
    imgUploadPreview.style = 'transform: scale(' + getNumberOfInput() / 100 + ')';
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

const resetValues = function () {
  let effect = effectList.querySelector('.effects__radio:checked');
  imgUploadPreview.className = '';
  imgUploadPreview.classList.add('effects__preview--' + effect.value);
  if (effect.value === 'none') {
    UploadEffectLevel.style = 'display: none';
  } else {
    UploadEffectLevel.style = 'display: flex';
  }

  effectLevelPin.style = "left: " + 100 + "%";
  effectLevelDepth.style = "width: " + 100 + "%";

  if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
    imgUploadPreview.style = "filter: grayscale(" + 1 + ")";
  } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
    imgUploadPreview.style = "filter: sepia(" + 1 + ")";
  } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
    imgUploadPreview.style = "filter: invert(" + 100 + "%)";
  } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
    imgUploadPreview.style = "filter: blur(" + 3 + "px)";
  } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
    imgUploadPreview.style = "filter: brightness(" + 3 + ")";
  } else {
    imgUploadPreview.style = "";
  }
  return effectLevelPin.style;
};

effectList.addEventListener('change', function () {
  resetValues();
});

const getEffectValue = function () {
  const lineWidthInPx = 452;
  const lineWidthInPercent = 100;

  effectLevelLine.addEventListener('mouseup', function (evt) {
    effectLevelPin.blur();
    effectLevelLine.focus();
    let e = Math.floor(evt.offsetX / (lineWidthInPx / lineWidthInPercent));
    effectLevelPin.style = "left: " + e + "%";
    effectLevelDepth.style = "width: " + e + "%";
    let getBlur = function (number = e) {
      let px = 0;
      if (number < 25) {
        px = 0;
      } else if (number > 25 && number < 50) {
        px = 1;
      } else if (number > 50 && number < 75) {
        px = 2;
      } else {
        px = 3;
      }
      return px;
    };
    let getBrightness = function (number = e) {
      let value = 0;
      if (number < 33) {
        value = 1;
      } else if (number > 33 && number < 66) {
        value = 2;
      } else {
        value = 3;
      }
      return value;
    };
    if (imgUploadPreview.classList.contains('effects__preview--chrome')) {
      imgUploadPreview.style = "filter: grayscale(" + e / 100 + ")";
    } else if (imgUploadPreview.classList.contains('effects__preview--sepia')) {
      imgUploadPreview.style = "filter: sepia(" + e / 100 + ")";
    } else if (imgUploadPreview.classList.contains('effects__preview--marvin')) {
      imgUploadPreview.style = "filter: invert(" + e + "%)";
    } else if (imgUploadPreview.classList.contains('effects__preview--phobos')) {
      imgUploadPreview.style = "filter: blur(" + getBlur() + "px)";
    } else if (imgUploadPreview.classList.contains('effects__preview--heat')) {
      imgUploadPreview.style = "filter: brightness(" + getBrightness() + ")";
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
    const minValue = 2;
    const maxValue = 20;

    for (let i = 0; i < arr.length; i++) {

      let tagArr = arr[i].split('');
      let sharp = tagArr.shift();

      if (sharp !== String('#')) {
        textHashtags.setCustomValidity('ХэшТеги должны начинаться с "#"');
      } else if (tagArr.includes('#') || tagArr.includes('@') || tagArr.includes('$') || tagArr.includes('<') || tagArr.includes('>') || tagArr.includes('%') || tagArr.includes('.') || tagArr.includes('!') || tagArr.includes('?') || tagArr.includes('"') || tagArr.includes('\'') || tagArr.includes('&') || tagArr.includes('|') || tagArr.includes('\\') || tagArr.includes('§') || tagArr.includes('¶') || tagArr.includes('+') || tagArr.includes('-') || tagArr.includes('=') || tagArr.includes('*') || tagArr.includes('/')) {
        textHashtags.setCustomValidity('ХэшТеги не должны содержать спецсимволы (#, @, $ и т. п.), знаки пунктуации, эмодзи и т.п.');
      } else if (tagArr.length + 1 < minValue) {
        textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (tagArr.length + 1 > maxValue) {
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

