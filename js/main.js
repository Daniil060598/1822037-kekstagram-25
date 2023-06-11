import {renderPictures} from './render-picture.js';
import './add-new-picture.js';
import {onWindowClose} from './add-new-picture.js';
import {setImgUploadFormSubmit} from './validate-new-picture.js';
import {getData} from './api.js';
import {initSorting} from './sorting.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 300;

getData((pictures) => {
  renderPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  initSorting(pictures, debounce((sortedPictures) => renderPictures(sortedPictures), RERENDER_DELAY));
});

setImgUploadFormSubmit(onWindowClose);

