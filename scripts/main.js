const menuIcon = document.querySelector('.nav-mobile');
const menuItems = document.querySelectorAll('.nav-item');
const nav = document.querySelector('.nav');

const toggleMobileMenu = () => {
  nav.style.transition = 'transform 0.55s cubic-bezier(0.785, 0.135, 0.15, 0.86)';
  menuIcon.classList.toggle('clicked');
  nav.classList.toggle('show');
};

menuIcon.addEventListener('click', toggleMobileMenu);

menuItems.forEach((item) => {
  item.addEventListener('click', toggleMobileMenu);
});

document.addEventListener('click', (e) => {
  if (e.target != nav && nav.classList.contains('show') && e.target != menuIcon) {
    toggleMobileMenu();
  }
});

console.log(
  'Вёрстка соответствует макету. Ширина экрана 768px +24' +
    '\n' +
    'Вёрстка соответствует макету. Ширина экрана 380px +24 ' +
    '\n' +
    'Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15' +
    '\n' +
    'при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка +2' +
    '\n' +
    'при нажатии на бургер-иконку плавно появляется адаптивное меню +4' +
    '\n' +
    'адаптивное меню соответствует цветовой схеме макета +4' +
    '\n' +
    'при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран +4' +
    '\n' +
    'ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +4' +
    '\n' +
    'при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна +4' +
    '\n' +
    'ИТОГО: 85'
);
