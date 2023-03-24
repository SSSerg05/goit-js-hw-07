import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

// SimpleLightbox
// https://simplelightbox.com/
// https://github.com/andreknieriem/simplelightbox?utm_source=cdnjs&utm_medium=cdnjs_link&utm_campaign=cdnjs_library


// Необходимо немного изменить разметку карточки галереи, используй этот шаблон.

// <li class="gallery__item">
//    <a class="gallery__link" href="large-image.jpg">
//       <img class="gallery__image" src="small-image.jpg" alt="Image description" />
//    </a>
// </li>

// Выполняй это задание в файлах 02-lightbox.html и 02-lightbox.js. Разбей его на несколько подзадач:

// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи. Используй готовый код из первого задания.
// Подключение скрипта и стилей библиотеки используя CDN сервис cdnjs. Необходимо добавить ссылки на два файла: simple-lightbox.min.js и simple-lightbox.min.css.
// Инициализация библиотеки после того как элементы галереи созданы и добавлены в ul.gallery. Для этого ознакомься с документацией SimpleLightbox - в первую очередь секции «Usage» и «Markup».
// Посмотри в документации секцию «Options» и добавь отображение подписей к изображениям из атрибута alt. Пусть подпись будет снизу и появляется через 250 миллисекунд после открытия изображения.


let gallery = new SimpleLightbox('.gallery a');

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

  a.append(img);
  li.append(a);

  return li;
})

gallery.append(...cards);


gallery.on('show.simplelightbox', function () {
	// Do something…
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e); // Some usefull information
});

// // with jQuery nearly the same
// let gallery = $('.gallery a').simpleLightbox();
// gallery.on('show.simplelightbox', function () {
// 	// Do something…
// });