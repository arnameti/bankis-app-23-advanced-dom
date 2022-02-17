'use strict';

//////////////////////////////////////////////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const logo = document.querySelector('.nav__logo');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////
// Menu Fade Animation I
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     console.log(e.target);

//     const siblings = document.querySelectorAll('.nav__link');

//     siblings.forEach(function (sibling) {
//       if (sibling !== e.target) {
//         sibling.style.opacity = '0.5';
//       }
//       logo.style.opacity = '0.5';
//     });
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     console.log(e.target);

//     const siblings = document.querySelectorAll('.nav__link');

//     siblings.forEach(function (sibling) {
//       if (sibling !== e.target) {
//         sibling.style.opacity = '1';
//       }
//       logo.style.opacity = '1';
//     });
//   }
// });

// Menu Fade Animation II
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(e.target);

    const siblings = document.querySelectorAll('.nav__link');

    siblings.forEach(function (sibling) {
      if (sibling !== e.target) {
        sibling.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

//////////////////////////////////////////////////////////////////////////////
// Tabbed component

const tabsContainer = document.querySelector('.operations__tab-container');

tabsContainer.addEventListener('click', function (e) {
  const clickedTab = e.target.closest('.operations__tab');

  if (!clickedTab) return;

  document
    .querySelectorAll('.operations__tab')
    .forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  document
    .querySelectorAll('.operations__content')
    .forEach(content =>
      content.classList.remove('operations__content--active')
    );

  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////////////////////////
//Button Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function (e) {
  const section1 = document.querySelector('#section--1');
  const section1_top = section1.getBoundingClientRect().top;

  window.scrollTo({
    top: section1_top + window.pageYOffset,
    behavior: 'smooth',
  });

  // section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     const sectionTarget = document.querySelector(id);
//     const sectionTarget_top = sectionTarget.getBoundingClientRect().top;

//     window.scrollTo({
//       top: sectionTarget_top + window.pageYOffset,
//       behavior: 'smooth',
//     });
//   })
// });

document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
//////////////////////////////////////////////////////////////////////////////
// Sticky Navigation - // Inefficient Way

// const section1_top = document
//   .querySelector('#section--1')
//   .getBoundingClientRect().top;
// const navHeight = nav.getBoundingClientRect().height;

// window.addEventListener('scroll', function () {
//   if (window.scrollY > section1_top - navHeight) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//////////////////////////////////////////////////////////////////////////////
// Sticky Navigation - Efficient Way - Intersection Observer API`

const header = document.querySelector('.header');

const stickyNav = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`
};

const navObserver = new IntersectionObserver(stickyNav, obsOptions);
navObserver.observe(header);
