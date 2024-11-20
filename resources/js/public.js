import 'swiper/css';
import 'photoswipe/style.css';

import PhotoSwipeLightbox from 'photoswipe/lightbox';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const
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

new Swiper('.team .swiper', {
  modules: [Navigation, Autoplay],
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  spaceBetween: 8,
  navigation: {
    nextEl: '.team .swiper-button-next',
    prevEl: '.team .swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    }
  }
});

new Swiper('.team .swiper', {
  modules: [Navigation, Autoplay],
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  spaceBetween: 8,
  navigation: {
    nextEl: '.team .swiper-button-next',
    prevEl: '.team .swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    }
  }
});

new Swiper('.press .swiper', {
  modules: [Navigation, Autoplay],
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  spaceBetween: 8,
  navigation: {
    nextEl: '.press .swiper-button-next',
    prevEl: '.press .swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1280: {
      slidesPerView: 3,
    }
  }
});

new Swiper('.reviews-swiper .swiper', {
  modules: [Navigation, Autoplay],
  loop: true,
  spaceBetween: 8,
  navigation: {
    nextEl: '.reviews-swiper .swiper-button-next',
    prevEl: '.reviews-swiper .swiper-button-prev',
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    }
  }
});

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


document.querySelectorAll('[data-gallery]').forEach((gallery) => {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: 'a',
    pswpModule: () => import('photoswipe')
  });

  lightbox.init();
});
