const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.btn--close-modal');
const btnShowModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.navbar');

//menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav-link')) {
    const link = e.target;
    const siblings = link.closest('.navbar').querySelectorAll('.nav-link');
    const logo = link.closest('.navbar').querySelector('img');
    console.log('link : ', link, 'sibling : ', siblings, 'logo : ', logo);
    if (link !== logo) logo.style.opacity = this;
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.4);
// });

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
//passing arg into handler
nav.addEventListener('mouseover', handleHover.bind(0.4));
nav.addEventListener('mouseout', handleHover.bind(1));

//add sticky class
// initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   console.log(initialCoords);
//   if (initialCoords.top < this.window.scrollY) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//sticky navigation : Intersection Observer API
// const callback = function (enteris, observer) {
//   enteris.forEach(entry => {
//     console.log(entry);
//   });
// };
// const options = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(callback, options);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log('height  :  ', navHeight);
const stickyNav = function (enteris) {
  const [entry] = enteris;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//reveal sections
document.addEventListener('DOMContentLoaded', function () {
  const allSections = document.querySelectorAll('.section');

  // Reveal section function
  const revealSection = function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.remove('section--hidden'); // Show section when it's visible
      observer.unobserve(entry.target); // Stop observing once revealed
    });
  };

  // Intersection Observer setup
  const revealObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15, // Only when at least 15% is visible
  });

  // Apply hidden class only AFTER the DOM is loaded
  allSections.forEach(section => {
    revealObserver.observe(section);
    section.classList.add('section--hidden');
  });
});

//lazy loading images
const imgTarget = document.querySelectorAll('img[data-src]');

const imgCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Replace lazy image with actual image
    entry.target.src = entry.target.dataset.src;

    // Remove blur class after the image is loaded
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0,
  rootMargin: '-250px', // Loads 50px before entering viewport
});

imgTarget.forEach(img => imgObserver.observe(img));

//slider
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxBtn = slides.length;
let cur = 0;

//go to slide
const gotoSlide = function (slide) {
  slides.forEach(
    (s, i) => (
      (s.style.transform = `translateX(${100 * (i - slide)}%)`),
      s.classList.add('dots__dot--active')
    )
  ); //0 100% 200% 300%
};

function init() {
  gotoSlide(0);
  createDots();
  activateDot(0);
}
init();
const nextSlide = function () {
  if (maxBtn - 1 == cur) {
    cur = 0;
  } else cur++;

  gotoSlide(cur);
  activateDot(cur);
};
const preSlide = function () {
  if (0 === cur) {
    cur = maxBtn - 1;
  } else cur--;

  gotoSlide(cur);
  activateDot(cur);
};
//next slide
btnRight.addEventListener('click', nextSlide);
//previos slide
btnLeft.addEventListener('click', preSlide);
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'ArrowLeft') preSlide();
  if (e.key === 'ArrowRight') nextSlide();
});
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activateDot(slide);
  }
});

/////////////////////////////////////////////////
console.log(btnShowModal);
const openModal = function (e) {
  e.preventDefault();
  console.log('Open Modal Clicked!'); // Debugging
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();
  console.log('Close Modal Clicked!'); // Debugging
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Attach event listeners
btnShowModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.forEach(btn => btn.addEventListener('click', closeModal));
overlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal(e);
  }
});

console.log('JavaScript is working!');

/*const msg = document.createElement('div');
msg.classList.add('cookie-message');
msg.innerHTML =
  'We use cookies for better functionality. <button class="btn btn--close--cookie">Got it!</button>';

const header = document.querySelector('.header');
console.log(header);
if (header) {
  header.after(msg);
  //header.append(msg.cloneNode(true));
} else {
  console.error("Element with class '.header' not found.");
}

document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    msg.remove();
    //msg.parentElement.removeChild(msg);
  });

msg.style.backgroundColor = '#37383d';
console.log(msg.style.color);
msg.style.height = (getComputedStyle(msg).height, 20) + 40 + 'px';
console.log(msg.style.height);

const logo = document.querySelector('.nav_logo');
console.log(logo.alt);
console.log(logo.src);

//NOn-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
console.log(logo.className);
console.log(logo.setAttribute('company', 'Bankist'));

const link = document.querySelector('.open-account');
console.log(link.href);
console.log(link.getAttribute('href'));
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');

//don't use it-override
logo.className = 'demo';
*/
//btn scrolling

btnScroll.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
  console.log(
    'height / width viewport ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //   window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  //   );

  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');
const alerth1 = function (e) {
  alert('addEventListener : great ! you are reading the heading');
  // h1.removeEventListener('mouseenter', alerth1);
};
// h1.addEventListener('mouseenter', alerth1);
// setTimeout(() => h1.removeEventListener('mouseenter', alerth1), 3000);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgba(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)},0.4)`;

// document.querySelector('.nav-link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
//   e.stopPropagation(); // stops bubbling, so the event does not go up to .nav-links or .navbar.
// });

// document.querySelector('.nav-links').addEventListener('click', function (e) {
//   if (!e.target.classList.contains('nav-link')) {
//     this.style.backgroundColor = randomColor();
//   }
// });

// document.querySelector('.navbar').addEventListener(
//   'click',
//   function () {
//     this.style.backgroundColor = randomColor();
//   },
//   true
// );

//page navigation

document.querySelectorAll('.nav-links').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});

//1 add event listener to common parent element
//2 determine what element originated the event

// document.querySelectorAll('.nav-links').addEventListener('click', function (e) {
//   e.preventDefault();
//   if (e.target.classList.contains('nav-link')) {
//     const id = e.target.getAttribute('href');
//     //     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
// });

//const h11 = document.querySelector('h1');
// console.log(h11);

// console.log(h11.querySelectorAll('.highlight'));
// console.log(h11.childNodes);
// console.log(h11.children);
// h11.firstElementChild.style.color = 'white';
// console.log(h11.parentElement);
// console.log(h11.parentNode);
// console.log(h11.parent);
// console.log(h11.closest('.header'));
//h11.closest('.header').style.background = 'var(--gradient-secondary)';

console.log(tabs, tabsContainer, tabsContent);

// tabs.forEach(t =>
//   t.addEventListener('click', function () {
//     t.classList.add('operations__tab--active');
//   })
// );

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // console.log('tab :: ', clicked.dataset.tab);
  // console.log(
  //   'content  --  ',
  //   document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  // );
  const tab = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  //remove the activate classes
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  //activate content area
  tab.classList.add('operations__content--active');
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = 'message';
});
