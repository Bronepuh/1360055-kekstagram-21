'use strict';

(function () {
  const COMMENTS_SHOW = 5;

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  const socialCommentCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const socialCommentsList = document.querySelector('.social__comments');

  const onBigPictureEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  };

  const closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  const openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  const generateCommentElement = function (comment) {
    const listItem = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');

    listItem.classList.add('social__comment');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.style.width = '35px';
    img.style.height = '35px';
    p.classList.add('social__text');
    p.textContent = comment.message;
    listItem.append(img);
    listItem.append(p);
    return listItem;
  };

  const generateCommentList = function (comments) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < comments.length; i++) {
      const newComment = generateCommentElement(comments[i]);
      fragment.append(newComment);
    }
    return fragment;
  };

  const createNewPicture = function (picture) {
    bigPicture.querySelector('img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
    commentsLoader.classList.add('hidden');
    socialCommentsList.innerHTML = '';
    socialCommentsList.append(generateCommentList(picture.comments));
    const nodeList = socialCommentsList.querySelectorAll('.social__comment');

    const hideNode = function () {
      nodeList.forEach(function (element) {
        element.classList.add('hidden');
      });
    };

    const showComments = function (commentsCount) {
      hideNode();
      for (let i = 0; i < commentsCount; i++) {
        nodeList[i].classList.remove('hidden');
      }
    };

    let commentsCount = 0;

    if (nodeList.length < COMMENTS_SHOW) {
      showComments(nodeList.length);

    } else {
      showComments(COMMENTS_SHOW);
      commentsLoader.classList.remove('hidden');
      commentsCount = commentsCount + COMMENTS_SHOW;

      commentsLoader.addEventListener('click', function () {
        commentsLoader.classList.remove('hidden');
        commentsCount = commentsCount + COMMENTS_SHOW;
        const diff = commentsCount - nodeList.length;
        if (commentsCount < nodeList.length) {
          showComments(commentsCount);
        } else {
          showComments(commentsCount - diff);
          commentsLoader.classList.add('hidden');
        }
      });
    }
  };

  socialCommentCount.classList.add('hidden');

  window.picture = {
    show: function (picture) {
      createNewPicture(picture);
      openBigPicture();
    }
  };
})();
