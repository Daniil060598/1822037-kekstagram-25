function setClassName(currentElem, elems) {
  for (const elem of elems) {
    elem.classList.remove('img-filters__button--active');
  }

  currentElem.classList.add('img-filters__button--active');
}

function getRandomPictures(pictures) {
  for (let i = 0; i < pictures.length; i++) {
    const r = Math.floor(Math.random() * (pictures.length - i)) + i;
    const picture = pictures[r];
    pictures[r] = pictures[i];
    pictures[i] = picture;
  }

  return pictures;
}

function initSorting(pictures, render) {
  const sortingElement = document.querySelector('.img-filters');

  if (!sortingElement) {
    return;
  }

  const sortingFormElement = sortingElement.querySelector('.img-filters__form');

  sortingElement.addEventListener('click', (evt) => {
    switch(true) {
      case evt.target.id === 'filter-default':
        setClassName(evt.target, sortingFormElement.children);
        render(pictures);
        break;
      case evt.target.id === 'filter-random':
        setClassName(evt.target, sortingFormElement.children);
        render(getRandomPictures([...pictures]));
        break;
      case evt.target.id === 'filter-discussed':
        setClassName(evt.target, sortingFormElement.children);
        render([...pictures].sort((a, b) => b.comments.length - a.comments.length));
        break;
      default:
        break;
    }
  });
}

export { initSorting };
