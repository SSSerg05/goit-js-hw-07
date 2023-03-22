import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

//** */ Задание 1 - галерея изображений
// Создай галерею с возможностью клика по её элементам и просмотра полноразмерного 
// изображения в модальном окне. Посмотри демо видео работы галереи.

// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. 
// Разбей его на несколько подзадач:

// Создание и рендер разметки по массиву данных galleryItems и предоставленному 
// шаблону элемента галереи.
// Реализация делегирования на ul.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox. 
// Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные(.min) 
// файлы библиотеки.
// Открытие модального окна по клику на элементе галереи. Для этого ознакомься 
// с документацией и примерами.
// Замена значения атрибута src элемента <img> в модальном окне перед открытием. 
// Используй готовую разметку модального окна с изображением из примеров библиотеки 
// basicLightbox.

//** */ Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, 
// и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть 
// в этом шаблоне.

// <li class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </li>

// Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь 
// будет перенаправлен на другую страницу. Запрети это поведение по умолчанию.

//** */ Закрытие с клавиатуры
// Добавь закрытие модального окна по нажатию клавиши Escape. 
// Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. 
// У библиотеки basicLightbox есть метод для программного закрытия модального окна.
const bigImages = [];
let instance;
let currentImage;
let count = 0;
const parent = document.querySelector('.gallery');

// https://www.jsdelivr.com/package/npm/basiclightbox  
// Events	Multiple ways to handle events.  
// https://codepen.io/electerious/pen/pOBLQQ

const chields = galleryItems.map(item => { 
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');

  li.classList.add('gallery__item');
  li.dataset.id = count;
  count++;

  a.classList.add('gallery__link');
  a.href = item.original;
  img.classList.add('gallery__image');
  img.src = item.preview;
  img.alt = item.description;
  img.loading = 'lazy';
  img.dataset.source = item.original;

  li.addEventListener('click', (event) => {
    // прибираємо скачування картинки та відкриття нового вікна по замовчуванню
    event.preventDefault();

    currentImage = event.currentTarget;

    // створюємо контейнер для модального вікна
    const div = document.createElement('div');
    div.style.position = 'relative';

    const image = document.createElement('img');
    image.src = item.original;
    image.style.cursor = 'zoom-out';
    image.addEventListener('click', () => instance.close())
 
    const btnNext = addNavButton('next')
    const btnPrev = addNavButton('prev')
    
    div.append( image, btnPrev, btnNext );
  
    // передаємо контейнер у обробчик Lightbox 
    instance = basicLightbox.create(div); 
    instance.show();
    console.log(instance);
  })

  a.append(img);
  li.append(a);

  return li;
})

parent.append(...chields);


function addNavButton(navstr) {
  const pos = (navstr === 'next') ? 'right': 'left' ;
  const btn = document.createElement('button')
    
  btn.type = 'button';
  btn.classList.add( (navstr === 'next') ? 'btn-next': 'btn-prev')
  
  const style = {
    position: 'absolute',
    top: '50%',
    display: 'block',
    'transform': 'transformX(50%)',
    'font-size': '60px',
    'padding': '10px',
    'border': 'none',
    'cursor': 'pointer',
    'color': 'red',
    'background-color' : 'rgba(0, 0, 0, .4)',
  }
  style[pos] = '20px';
  Object.assign(btn.style, style)
  btn.textContent = (navstr === 'next') ? '>': '<'

  btn.addEventListener('click', () => {
    const navigation = (navstr === 'next') ? nextSibling : prevSibling 
    console.log(navigation)
    navigation();
  })

  return btn;
}

function nextSibling() {
  instance.close();
  console.log('current',currentImage)
  const nodeNext = currentImage.nextSibling
  console.log('next',nodeNext) 
  nodeNext.click();
}
function prevSibling() {
  instance.close();
  console.log('current',currentImage)
  const nodePrev = currentImage.previousSibling  
  console.log('prev',nodePrev)
  nodePrev.click();
}
