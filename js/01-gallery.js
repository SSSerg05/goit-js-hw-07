import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

//** */ Задание 1 - галерея изображений
// підключення lightbox
// https://www.jsdelivr.com/package/npm/basiclightbox

let instance = null;
let currentImage = null;
let isModalActive = false;

const parent = document.querySelector('.gallery');

// створюємо кнопки навігації у модальному вікні
const btnNext = addNavButton('next')
const btnPrev = addNavButton('prev')

// створюємо наповнення галереї
const chields = galleryItems.map(item => { 
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');

  li.classList.add('gallery__item');

  a.classList.add('gallery__link');
  a.href = item.original;
  img.classList.add('gallery__image');
  img.src = item.preview;
  img.alt = item.description;
  img.loading = 'lazy';
  img.dataset.source = item.original;

  a.append(img);
  li.append(a);

  return li;
})

parent.append(...chields);
parent.addEventListener('click', onClickImage)

// ловимо подію у поточному документі
document.addEventListener('keydown', (event) => {
  if (!isModalActive) {
    return
  }

  event.preventDefault();
  const obj = {
    'ArrowRight': onPressNextButton,
    'ArrowLeft': onPressPrevButton,
    'Escape': instanceClose,
  }

  // обробчик клавіатури
  for (const key in obj) {
    if (event.key === key) { 
      obj[key]();
    }
  }
})

function onPressNextButton() { 
  btnNext.click()
}
function onPressPrevButton() { 
  btnPrev.click()
}

// закриваємо модальне вікно
function instanceClose() { 
  instance.close()
  isModalActive = false;
}

// подія onClick на картинці
function onClickImage(event) { 
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  event.preventDefault();

  isModalActive = true;
  currentImage = event.target;
  // console.log(currentImage);
  
  // створюємо контейнер для модального вікна
  const div = document.createElement('div');
  div.style.position = 'relative';

  const image = document.createElement('img');
  image.src = currentImage.dataset.source;
  image.alt = currentImage.alt;
  image.style.cursor = 'zoom-out';
  
  // ловимо подію на картинці модального вікна
  image.addEventListener('click', () => instanceClose())

  // додаємо всі елементи до контейнеру
  div.append( image, btnPrev, btnNext );

  // передаємо контейнер у обробчик Lightbox 
  instance = basicLightbox.create(div);
  instance.show();
}


// додаємо кнопки для навігації по галереї
function addNavButton(navstr) {
  const pos = (navstr === 'next') ? 'right' : 'left';
  const btn = document.createElement('button')
    
  btn.type = 'button';
  btn.classList.add((navstr === 'next') ? 'btn-next' : 'btn-prev')
  
  const style = {
    position: 'absolute',
    top: '50%',
    display: 'block',
    'transform': 'transformX(50%)',
    'font-size': '60px',
    'padding': '10px',
    'border': 'none',
    'cursor': 'pointer',
    'color': 'white',
    'backgroundColor': 'rgba(0, 0, 0, .4)',
  }
  style[pos] = '20px';
  btn.textContent = (navstr === 'next') ? '>' : '<'

  // додаємо сss-стилі для кнопки
  document.styleSheets[0].insertRule(`.btn-${navstr} {}`, 0);
  const cssStyle = document.styleSheets[0].cssRules[0].style;
  Object.assign(cssStyle, style);

  // додаємо сss-стилі для наведення мишки на кнопку
  document.styleSheets[0].insertRule(`.btn-${navstr}:hover, .btn-${navstr}:focus {color:red}`, 0); 
   
  // подія - клік на кнопці навігації
  btn.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'BUTTON') { 
      return;
    }

    instanceClose();

    // (currentImage) == img < a < li
    const li = currentImage.parentNode.parentNode;
    const activeNode = (navstr === 'next') ?
      li.nextSibling :
      li.previousSibling ;
    
    // li > a > img (next/prev image).click() ? -> true
    activeNode?.lastChild.lastChild.click();

  })

  return btn;
}
