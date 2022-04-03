import {isEscapeKey} from './util.js';

const body = document.body;
const fullPicture = document.querySelector('.big-picture');
const fullPictureImg = fullPicture.querySelector('.big-picture__img img');
const fullPictureLikes = fullPicture.querySelector('.likes-count');
const fullPictureCommentsCount = fullPicture.querySelector('.comments-count');
const fullPictureDescription = fullPicture.querySelector('.social__caption');
const pictureButtonCancelElement = fullPicture.querySelector('#picture-cancel');
const commentsList = fullPicture.querySelector('.social__comments');
const commentsButtonLoader = fullPicture.querySelector('.social__comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');


const closeWindow = () => {
  fullPicture.classList.add('hidden');
  commentsList.innerHTML = '';
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openWindow = () => {
  fullPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeWindow();
  }
}

const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentCopy = commentTemplate.cloneNode(true);
    commentCopy.querySelector('.social__picture').src = comment.avatar;
    commentCopy.querySelector('.social__picture').alt = comment.name;
    commentCopy.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentCopy);
  });

  commentsList.appendChild(commentsListFragment);
};

const openFullPictureWindow = (picture) => {
  commentsButtonLoader.classList.add('hidden');
  fullPictureImg.src = picture.url;
  fullPictureLikes.textContent = picture.likes;
  fullPictureDescription.textContent = picture.description;
  fullPictureCommentsCount.textContent = picture.comments.length;
  renderComments(picture.comments);
  openWindow();
};

pictureButtonCancelElement.addEventListener('click', () => {
  closeWindow();
});

export {openFullPictureWindow};
