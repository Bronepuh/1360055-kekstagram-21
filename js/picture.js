'use strict';

(function () {
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

    const commentsShow = 5;
    let commentsCount = 0;

    if (nodeList.length < commentsShow) {
      showComments(nodeList.length);

    } else {
      showComments(commentsShow);
      commentsLoader.classList.remove('hidden');
      commentsCount = commentsCount + commentsShow;
      commentsLoader.addEventListener('click', function () {

        commentsCount = commentsCount + commentsShow;
        let diff = commentsCount - nodeList.length;
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
