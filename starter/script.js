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
// Menu Fade Animation
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    console.log(e.target);

    const siblings = document.querySelectorAll('.nav__link');

    siblings.forEach(function (sibling) {
      if (sibling !== e.target) {
        sibling.style.opacity = '0.5';
      }
      logo.style.opacity = '0.5';
    });
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    console.log(e.target);

    const siblings = document.querySelectorAll('.nav__link');

    siblings.forEach(function (sibling) {
      if (sibling !== e.target) {
        sibling.style.opacity = '1';
      }
      logo.style.opacity = '1';
    });
  }
});
