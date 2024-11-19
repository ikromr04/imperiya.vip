import 'swiper/css';

import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

const
  screenWidth = window.innerWidth,

  setMaxHeight = (wrapper, expanded) => {
    const sizable = wrapper.querySelector('[data-sizable]');
    sizable.style.maxHeight = expanded
      ? `${sizable.scrollHeight}px`
      : `${sizable.dataset.sizable}px`;
  };

new Swiper('.certificates .swiper', {
  modules: [Pagination, Autoplay],
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: false,
  pagination: {
    el: '.certificates .swiper-pagination',
    clickable: true,
  },
  slidesPerView: 3,
  spaceBetween: 8,
  breakpoints: {
    460: {
      slidesPerView: 4,
    },
    640: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 6,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 16,
    },
  }
});

new Swiper('.partners .swiper', {
  modules: [Pagination, Autoplay],
  loop: false,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: {
    el: '.partners .swiper-pagination',
    clickable: true,
  },
  slidesPerView: 2,
  spaceBetween: 16,
  breakpoints: {
    375: {
      slidesPerView: 3,
    },
    520: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 5,
    },
  }
});

if (screenWidth < 1024) {
  let startX = 0;
  let endX = 0;

  document.addEventListener('touchstart', (evt) => {
    startX = evt.touches[0].clientX;

    if (!document.body.classList.contains('overflow-hidden') && startX < screenWidth * 0.9) {
      startX = null;
    }
  });

  document.addEventListener('touchmove', (evt) => {
    if (startX !== null) {
      endX = evt.touches[0].clientX;
    }
  });

  document.addEventListener('touchend', () => {
    if (startX !== null) {
      const deltaX = startX - endX;

      if (deltaX > 50 && !document.body.classList.contains('overflow-hidden')) {
        document.body.classList.add('overflow-hidden');
      } else if (deltaX < -50 && document.body.classList.contains('overflow-hidden')) {
        document.body.classList.remove('overflow-hidden');
      }
    }
  });
}

document.addEventListener('click', (evt) => {
  const
    clickedWrapper = evt.target.closest('[data-sizable-wrapper]'),
    activeWrapper = document.querySelector('.shown[data-sizable-wrapper]');

  if (clickedWrapper) {
    if (activeWrapper && activeWrapper !== clickedWrapper) {
      activeWrapper.classList.remove('shown');
      setMaxHeight(activeWrapper, false);
    }

    if (clickedWrapper.classList.contains('shown')) {
      clickedWrapper.classList.remove('shown');
      setMaxHeight(clickedWrapper, false);
    } else {
      clickedWrapper.classList.add('shown');
      setMaxHeight(clickedWrapper, true);
    }
  }

  if (activeWrapper) {
    activeWrapper.classList.remove('shown');
    setMaxHeight(activeWrapper, false);
  }
});
