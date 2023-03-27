import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

// SimpleLightbox
// https://simplelightbox.com/
// https://github.com/andreknieriem/simplelightbox?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library

const parent = document.querySelector('.gallery');

//** First variant
// створюємо наповнення галереї li > a > img
// const cards = galleryItems.map(item => {
//   const li = document.createElement('li');
//   const a = document.createElement('a');
//   const img = document.createElement('img');

//   li.classList.add('gallery__item');

//   a.classList.add('gallery__link');
//   a.href = item.original;

//   img.classList.add('gallery__image');
//   img.src = item.preview;
//   img.alt = item.description;
//   img.title = item.description;

//   a.append(img);
//   li.append(a);

//   return li;
// })
// parent.append(...cards);

//** Second variant
const cards = galleryItems.map(item => { 
  const sample = `
    <li class="gallery__item">
     <a class="gallery__link" href="${item.original}">
        <img class="gallery__image"
          src="${item.preview}" 
          alt="${item.description}" 
          title="${item.description}" />
     </a>
    </li>`;
  return sample;
});

parent.insertAdjacentHTML('afterbegin', cards.join(''));

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {
	// Do something…
  gallery.captionDelay = 250;
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e); // Some usefull information
});
