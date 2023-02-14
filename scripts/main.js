//mobile-menu

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

//custom select

const data = {
  'New York City': { 'office adress': '9 East 91st Street', phone: '+1 212 456 0002' },
  'Canandaigua, NY': { 'office adress': '151 Charlotte Street', phone: '+1 585 393 0001' },
  'Yonkers, NY': { 'office adress': '511 Warburton Ave', phone: '+1 914 678 0003' },
  'Sherrill, NY': { 'office adress': '14 WEST Noyes BLVD', phone: '+1 315 908 0004' },
};

const cityBtn = document.querySelector('.city-btn');
const cityList = document.querySelector('.city-list');
const cityItems = document.querySelectorAll('.city-item');
const cityCard = document.querySelector('.city-card');
const cityWrapper = document.querySelector('.contacts-wrapper');

createCityCard = (key) => {
  const city = document.querySelector('.city-name');
  const phone = document.querySelector('.phone-number');
  const adress = document.querySelector('.adress');

  city.textContent = key;
  adress.textContent = data[key]['office adress'];
  phone.textContent = data[key]['phone'];
};

const getCity = (e) => {
  cityList.classList.toggle('hidden');
  cityItems.forEach((item) => {
    item.classList.remove('expand');
  });
  cityBtn.textContent = e.target.dataset.value;

  setTimeout(() => {
    cityCard.classList.remove('non-displayed');
    createCityCard(e.target.dataset.value);
  }, 300);
};

const openSelect = () => {
  cityCard.classList.add('non-displayed');

  if (!cityList.classList.contains('hidden')) {
    cityBtn.classList.remove('city-btn__clicked');
    cityList.classList.add('hidden');
    cityBtn.textContent = 'City';
    if (window.innerWidth < 480) {
      cityWrapper.classList.remove('bg-hidden');
    }

    cityItems.forEach((item) => {
      item.classList.remove('expand');
    });
  } else {
    cityBtn.classList.add('city-btn__clicked');
    cityList.classList.toggle('hidden');
    if (window.innerWidth < 480) {
      cityWrapper.classList.add('bg-hidden');
    }

    cityItems.forEach((item) => {
      item.classList.add('expand');
      item.addEventListener('click', getCity);
    });
  }
};

cityBtn.addEventListener('click', openSelect);

//focus changing

const serviceBtns = document.querySelectorAll('.service-btn');
const serviceCards = document.querySelectorAll('.service-item');
const handleBlur = (arr) => {
  serviceCards.forEach((card) => {
    if (arr.includes(card.dataset.value)) {
      card.classList.remove('blur');
    } else {
      card.classList.add('blur');
    }
  });
};

let clickCount = 0;
let dataList = [];

serviceBtns.forEach((el) =>
  el.addEventListener('click', (e) => {
    if (el.dataset.value == e.target.dataset.value && el.classList.contains('active')) {
      clickCount--;
      if (clickCount < 2) {
        serviceBtns.forEach((btn) => {
          btn.disabled = false;
        });
      }
      el.classList.remove('active');
      dataList.splice(dataList.indexOf(e.target.dataset.value), 1);

      document.querySelectorAll('.btn.active').length > 0
        ? handleBlur(dataList)
        : serviceCards.forEach((card) => {
            card.classList.remove('blur');
          });
    } else if (clickCount < 2) {
      el.classList.add('active');
      clickCount++;
      dataList.push(e.target.dataset.value);
      handleBlur(dataList);

      if (clickCount === 2) {
        serviceBtns.forEach((btn) => {
          if (!dataList.includes(btn.dataset.value)) {
            btn.disabled = true;
          }
        });
      }
    }
  })
);

//accordeon

const priceBtns = document.querySelectorAll('.btn-prices');
const summaryCards = document.querySelectorAll('.summary');
const toggleSummary = (data) => {
  summaryCards.forEach((el) => {
    if (el.dataset.value === data) {
      el.classList.toggle('summary-open');
    }

    if (el.dataset.value !== data) {
      el.classList.remove('summary-open');
      priceBtns.forEach((el) => {
        if (el.dataset.value !== data) {
          el.classList.remove('extend');
        }
      });
    }
  });
};

priceBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.target.classList.toggle('extend');
    toggleSummary(e.target.dataset.value);
  });
});

console.log(
  'В разделе service при выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20 ' +
    '\n' +
    'Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20 ' +
    '\n' +
    'Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10' +
    '\n' +
    'При нажатии на dropdown кнопку в accordion появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25' +
    '\n' +
    'Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25' +
    '\n' +
    'В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15' +
    '\n' +
    'При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10' +
    '\n' +
    'ИТОГО: 125'
);
