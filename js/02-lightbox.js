import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

// SimpleLightbox
// https://simplelightbox.com/
// https://github.com/andreknieriem/simplelightbox?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library

const parent = document.querySelector('.gallery');

// створюємо наповнення галереї li > a > img
const cards = galleryItems.map(item => { 
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');

  li.classList.add('gallery__item');

  a.classList.add('gallery__link');
  a.href = item.original;

  img.classList.add('gallery__image');
  img.src = item.preview;
  img.alt = item.description;
  img.title = item.description;

  a.append(img);
  li.append(a);

  return li;
})

parent.append(...cards);

let gallery = new SimpleLightbox('.gallery a');
gallery.on('show.simplelightbox', function () {
	// Do something…
  gallery.captionDelay = 250;
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e); // Some usefull information
});
