/*!
 * main.js
 */
document.addEventListener('DOMContentLoaded', () => {
  // Init MiniLazyload
  new MiniLazyload();

  // Handle selects (Init Easydropdown, Select2)
  const selects = document.querySelectorAll('select');

  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];

    if (select.classList.contains('js-select2')) {
      // Init Select2 (Official board Subject select only)
      $('.js-select2').select2();
      break;
    } else {
      // Init Easydropdown (nice selects globally)
      const edd = easydropdown(select, {
        behavior: {
          maxVisibleItems: 5,
        },
      });
    }
  }

  // easydropdown.all({
  //   behavior: {
  //     maxVisibleItems: 5
  //   }
  // });

  // Init Flatpickr (date picker)
  const datePickers = document.querySelectorAll('.js-datePicker');
  if (datePickers.length) {
    flatpickr('.js-datePicker', {
      locale: 'cs',
      monthSelectorType: 'static',
      prevArrow:
        '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.52929 0.469706C5.66974 0.610332 5.74863 0.800956 5.74863 0.999706C5.74863 1.19846 5.66974 1.38908 5.52929 1.52971L2.06029 4.99971L5.53029 8.46971C5.65716 8.59682 5.7342 8.76524 5.74742 8.94434C5.76063 9.12345 5.70913 9.30135 5.60229 9.44571L5.52929 9.52971C5.38867 9.67016 5.19804 9.74905 4.99929 9.74905C4.80054 9.74905 4.60992 9.67016 4.46929 9.52971L0.469293 5.52971C0.328843 5.38908 0.249953 5.19846 0.249953 4.99971C0.249953 4.80096 0.328843 4.61033 0.469293 4.46971L4.46929 0.469706C4.60992 0.329256 4.80054 0.250366 4.99929 0.250366C5.19804 0.250366 5.38867 0.329256 5.52929 0.469706Z" fill="#121619"/></svg>',
      nextArrow:
        '<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.470097 9.52971C0.329646 9.38909 0.250757 9.19846 0.250757 8.99971C0.250757 8.80096 0.329646 8.61034 0.470097 8.46971L3.9391 4.99971L0.469097 1.52971C0.342229 1.4026 0.265185 1.23418 0.251972 1.05508C0.23876 0.87597 0.290255 0.698069 0.397097 0.553714L0.470097 0.469714C0.610722 0.329264 0.801346 0.250374 1.0001 0.250374C1.19885 0.250374 1.38947 0.329264 1.5301 0.469714L5.5301 4.46971C5.67055 4.61034 5.74944 4.80096 5.74944 4.99971C5.74944 5.19846 5.67055 5.38909 5.5301 5.52971L1.5301 9.52971C1.38947 9.67016 1.19885 9.74905 1.0001 9.74905C0.801346 9.74905 0.610722 9.67016 0.470097 9.52971Z" fill="#121619"/></svg>',
    });
  }

  // Init esgallery
  const galleries = document.querySelectorAll('.js-esgallery');

  if (galleries.length) {
    (function ($) {
      $(document).ready(function () {
        var galleryOptions;
        if (typeof esgalleryOptions !== 'undefined' && esgalleryOptions !== null) {
          galleryOptions = esgalleryOptions;
        } else {
          galleryOptions = {
            onReady: false,
            path: '',
            container: 'esgallery',
            containerOverlay: 'esgallery-overlay',
            sprite: '',
            htmlOpenLink: '.js-esgallery-open',
            htmlCloseLink: '.js-esgallery-close',
            social: false,
            summary: false,
            showLink: '#show-link',
            showLinkCopy: 'Kopírovat odkaz',
            controlSlideshow: true,
            controlCaption: false,
            controlPlaylist: true,
            controlFullImage: true,
            controlTitle: false,
          };
        }
        $('#media-list').esgallery(galleryOptions);
      });
    })(jQuery);
  }

  // Skip init secondary partners carousel and remove primary partners carousel on Partners page only
  if (document.body.classList.contains('PartnersPage')) {
    const partners = document.querySelectorAll('.js-partners');
    partners[1].remove();
    partners[0].classList.remove('u-border-top-primary', 'u-py-40');
    partners[0].querySelector('.Container').classList.add('u-md-mt-24');
    partners[0].querySelector('.Container').classList.remove('Container');
    partners[0].querySelector('.swiper').classList.remove('swiper', 'swiper--partners');
    partners[0].querySelector('.swiper-wrapper').classList.remove('swiper-wrapper');
    partners[0].querySelector('#js-carousel--partners').removeAttribute('id');
  }

  // Swiper (carousel) init - Partners
  const carouselPartners = document.getElementById('js-carousel--partners');

  if (carouselPartners) {
    const swiperPartners = new Swiper('#js-carousel--partners', {
      direction: 'vertical',
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      centeredSlides: false,
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 1500,
    });
  }

  function swiperAfterInit(nav) {
    const buttonsPrev = nav.prevEl;
    const buttonsNext = nav.nextEl;

    buttonsPrev.forEach((buttonPrev) => {
      buttonPrev.setAttribute('aria-label', buttonPrev.dataset.ariaLabel);
    });

    buttonsNext.forEach((buttonNext) => {
      buttonNext.setAttribute('aria-label', buttonNext.dataset.ariaLabel);
    });
  }

  // Init Masonry grid
  const board = document.getElementById('js-board');

  if (board) {
    imagesLoaded(board, function () {
      const masonry = new Masonry(board, {
        itemSelector: '.Board-item',
        columnWidth: '.Board-sizer',
        gutter: '.Board-gutterSizer',
      });
    });
  }

  if (typeof jQuery !== 'undefined' && $.nette) {
    // Init Nette AJAX
    $(function () {
      $.nette.init();
    });
  }

  // Table overflow wrappers
  const tables = document.querySelectorAll('table');
  if (tables.length) {
    for (let index = 0; index < tables.length; index++) {
      const table = tables[index];

      if (table.classList.contains('js-table-notResponsive')) {
        break;
      }

      const wrapper = document.createElement('div');
      wrapper.style.overflowX = 'auto';
      table.after(wrapper);
      wrapper.appendChild(table);
    }
  }

  // Add containers for social media, iframes
  function handleSocialMedia() {
    // const isActive = "is-active";

    const cookieConsentFrame = isLocalhost
      ? '<iframe class="js-cookieConsent-frame" src="./cookie-consent-frame.html"></iframe>'
      : '<iframe class="js-cookieConsent-frame" src="/dist/cookie-consent-frame.html"></iframe>';
    const iframes = document.querySelectorAll('iframe');
    const twitters = document.querySelectorAll('.twitter-tweet');
    const instagrams = document.querySelectorAll('.instagram-media');
    const tikToks = document.querySelectorAll('.tiktok-embed');

    // YouTube, Facebook iframes
    if (iframes.length) {
      for (let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i];
        const src = iframe.getAttribute('data-src');

        // YouTube
        if (src && src.includes('youtube')) {
          const container = document.createElement('div');
          container.classList.add('YouTubeContainer', 'js-embedSocialMedia');
          iframe.after(container);
          container.appendChild(iframe);
        }

        // Facebook
        if (src && src.includes('facebook')) {
          const container = document.createElement('div');
          container.classList.add('EmbedContainer', 'js-embedSocialMedia');
          iframe.after(container);
          container.appendChild(iframe);
        }
      }
    }

    // Twitters
    if (twitters.length) {
      for (let i = 0; i < twitters.length; i++) {
        const twitter = twitters[i];

        const container = document.createElement('div');
        container.classList.add('EmbedContainer', 'js-embedSocialMedia');
        twitter.after(container);
        container.appendChild(twitter);
        container.insertAdjacentHTML('afterbegin', cookieConsentFrame);
      }
    }

    // Instagrams
    if (instagrams.length) {
      for (let i = 0; i < instagrams.length; i++) {
        const instagram = instagrams[i];

        const container = document.createElement('div');
        container.classList.add('EmbedContainer', 'js-embedSocialMedia');
        instagram.after(container);
        container.appendChild(instagram);
      }
    }

    // TikToks
    if (tikToks.length) {
      for (let i = 0; i < tikToks.length; i++) {
        const tikTok = tikToks[i];

        const container = document.createElement('div');
        container.classList.add('EmbedContainer', 'js-embedSocialMedia');
        tikTok.after(container);
        container.appendChild(tikTok);
        container.insertAdjacentHTML('afterbegin', cookieConsentFrame);
      }
    }
  }
  handleSocialMedia();

  function checkSocialMedia() {
    const socialMedia = document.querySelectorAll('.js-embedSocialMedia');

    socialMedia.forEach((item) => {
      if (item.childNodes.length > 1) {
        item.childNodes.forEach((i) => {
          // Twitter - remove cookie consent frame
          if (i.classList.contains('twitter-tweet-rendered')) {
            item.querySelector('.js-cookieConsent-frame') &&
              item.querySelector('.js-cookieConsent-frame').remove();
          }

          // TikTok - remove cookie consent frame
          if (i.querySelector('iframe')) {
            item.querySelector('.js-cookieConsent-frame') &&
              item.querySelector('.js-cookieConsent-frame').remove();
          }
        });
      }
    });
  }

  // Mutation Observer example
  const mutationCallback = () => {
    checkSocialMedia();
  };

  if (document.querySelector('.Article-body')) {
    const mutationObserver = new MutationObserver(mutationCallback);

    const targetNode = document.querySelector('.Article-body');
    mutationObserver.observe(targetNode, { subtree: true, childList: true });
  }

  // Article - remove empty paragraphs
  const articleParagraphs = document.querySelectorAll('.Article-body p');
  if (articleParagraphs.length) {
    articleParagraphs.forEach((par) => {
      if (par.innerHTML === '&nbsp;') {
        par.style.display = 'none';
      }
    });
  }

  // Article - clear Futsal tables
  const futsalTableTitleImages = document.querySelectorAll("[src='/img/hlstr/titulkaL.gif']");
  futsalTableTitleImages.forEach((item) => {
    item.remove();
  });

  const futsalTableBgcRows = document.querySelectorAll('[bgcolor]');
  futsalTableBgcRows.forEach((item) => {
    item.removeAttribute('bgcolor');
  });

  const tableRows = document.querySelectorAll('table tr');
  const futsalTableEmptyRows = Array.from(tableRows).filter((row) => !row.innerHTML.trim());
  futsalTableEmptyRows.forEach((item) => {
    item.remove();
  });

  const futsalTableEmptyCells = document.querySelectorAll("[height='1']");
  futsalTableEmptyCells.forEach((item) => {
    item.parentNode.remove();
  });

  // Round details toggle
  const roundDetailsBtns = document.querySelectorAll('.js-matchRoundDetails-toggle');

  if (roundDetailsBtns.length) {
    roundDetailsBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const textShow = btn.querySelector('.js-matchRoundDetails-toggle-text-show');
        const textHide = btn.querySelector('.js-matchRoundDetails-toggle-text-hide');

        btn.classList.toggle('is-active');
        btn.setAttribute('aria-expanded', btn.classList.contains('is-active'));

        textShow.classList.toggle('u-display-none');
        textHide.classList.toggle('u-display-none');

        const details = btn
          .closest('.js-matchRoundSection')
          .querySelectorAll('.js-matchRoundDetails');
        details.forEach((detail) => {
          detail.classList.toggle('u-display-none');
        });
      });
    });
  }

  // Stats details toggle
  const statsDetailsBtns = document.querySelectorAll('.js-statsDetails-toggle');
  const statsDetailsAllBtns = document.querySelectorAll('.js-statsDetailsAll-toggle');

  if (statsDetailsBtns.length) {
    statsDetailsBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('is-active');
        btn.setAttribute('aria-expanded', btn.classList.contains('is-active'));

        const details = btn.closest('tr').nextElementSibling;
        details.classList.toggle('u-display-none');
      });
    });
  }

  if (statsDetailsAllBtns.length) {
    statsDetailsAllBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('is-active');
        btn.setAttribute('aria-expanded', btn.classList.contains('is-active'));

        const stats = btn.closest('.js-stats');
        const details = stats.querySelectorAll('.js-statsDetails');
        const detailsBtns = stats.querySelectorAll('.js-statsDetails-toggle');

        details.forEach((item) => {
          if (btn.classList.contains('is-active')) {
            item.classList.remove('u-display-none');
          } else {
            item.classList.add('u-display-none');
          }
        });

        detailsBtns.forEach((item) => {
          if (btn.classList.contains('is-active')) {
            item.classList.add('is-active');
            item.setAttribute('aria-expanded', true);
          } else {
            item.classList.remove('is-active');
            item.setAttribute('aria-expanded', false);
          }
        });
      });
    });
  }

  // Clickable map navigation
  const regions = document.querySelectorAll('.js-region');
  regions.forEach((el) => {
    // toggle highlight class on hover
    el.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = `#${el.dataset.region}`;
    });
    el.addEventListener('mouseover', () => handleRegionSelect(el, 'mouseover'));
    el.addEventListener('mouseout', () => handleRegionSelect(el, 'mouseout'));
  });

  const handleRegionSelect = (el, event) => {
    const target = el.dataset.region;
    const elementsToUpdate = Array.from(regions).filter((r) => r.dataset.region === target);

    if (event === 'mouseover') {
      elementsToUpdate.forEach((el) => el.classList.add('is-highlighted'));
    } else {
      elementsToUpdate.forEach((el) => el.classList.remove('is-highlighted'));
    }
  };
});

window.addEventListener('load', () => {
  // Remove Preload class (prevent unwanted CSS transitions on load)
  document.documentElement.classList.remove('Preload');

  // Remove Preload class (prevent unwanted CSS animations on load)
  const notAnimEls = document.querySelectorAll('.NotAnimOnLoad');
  if (notAnimEls.length) {
    notAnimEls.forEach((el) => {
      el.classList.remove('NotAnimOnLoad');
    });
  }
});

// Toggle Preload class on resize (prevent unwanted CSS transitions on resize)
let resizeTimer;
window.addEventListener('resize', () => {
  document.documentElement.classList.add('Preload');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.documentElement.classList.remove('Preload');
  }, 400);
});

// show password
document.querySelectorAll('.toggle-password').forEach(function (toggleButton) {
  toggleButton.addEventListener('click', function () {
    var toggleSelector = toggleButton.getAttribute('toggle');
    var input = toggleButton.parentElement.querySelector(toggleSelector);
    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
        toggleButton.classList.add('active');
      } else {
        input.type = 'password';
        toggleButton.classList.remove('active');
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const newSlider = document.getElementById('swiper-fotbal');

  if (!newSlider) return;

  // Получаем сегодняшнюю дату в формате YYYY-MM-DD
  const today = new Date();
  const todayFormatted = today.toISOString().split('T')[0];

  // Получаем список всех слайдов
  const slides = document.querySelectorAll('.swiper-slide a');

  let initialSlideIndex = 0;

  // Находим индекс слайда, соответствующего сегодняшней дате
  slides.forEach((slide, index) => {
    const slideDate = new URL(slide.href, window.location.origin).searchParams.get('date');
    if (slideDate === todayFormatted) {
      initialSlideIndex = index;
    }
  });

  // Функция для расчёта количества видимых слайдов
  const calculateSlidesPerView = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 440) return 1;
    if (windowWidth < 640) return 2;
    if (windowWidth < 840) return 3;
    if (windowWidth < 920) return 4;
    if (windowWidth < 1100) return 5;
    return 7;
  };

  // Объявляем переменную swiperNew заранее
  let swiperNew;

  // Инициализация Swiper
  swiperNew = new Swiper(newSlider, {
    direction: 'horizontal',
    loop: false, // Отключаем бесконечный цикл
    slidesPerView: calculateSlidesPerView(),
    slidesPerGroup: calculateSlidesPerView(),
    speed: 800,
    initialSlide: initialSlideIndex, // Устанавливаем начальный слайд на текущую дату

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      320: { slidesPerView: 1, slidesPerGroup: 1 },
      440: { slidesPerView: 2, slidesPerGroup: 2 },
      640: { slidesPerView: 3, slidesPerGroup: 3 },
      840: { slidesPerView: 4, slidesPerGroup: 4 },
      920: { slidesPerView: 5, slidesPerGroup: 5 },
      1100: { slidesPerView: 7, slidesPerGroup: 7 },
    },

    on: {
      init: function () {
        if (swiperNew) updateNavigation(swiperNew);
      },
      slideChange: function () {
        if (swiperNew) updateNavigation(swiperNew);
      },
    },
  });

  // Функция обновления состояния кнопок навигации
  function updateNavigation(swiper) {
    if (!swiper || typeof swiper.activeIndex === 'undefined') return;

    const activeIndex = swiper.activeIndex;
    const lastSlideIndex = slides.length - 1;

    // Вместо прямого обращения к prevEl и nextEl используем методы API Swiper
    swiper.navigation.update();

    // Теперь используем методы Swiper для проверки состояния кнопок
    const prevButton = swiper.navigation.prevEl;
    const nextButton = swiper.navigation.nextEl;

    // Проверяем наличие кнопок и обновляем их классы
    if (prevButton && nextButton) {
      prevButton.classList.toggle('swiper-button-disabled', activeIndex === 0);
      nextButton.classList.toggle('swiper-button-disabled', activeIndex >= lastSlideIndex);
    }
  }

  // Обновляем слайдер при изменении размера экрана
  window.addEventListener('resize', () => {
    if (swiperNew) {
      swiperNew.params.slidesPerView = calculateSlidesPerView();
      swiperNew.update();
    }
  });
});

const sliderLoyality = document.querySelector('.swiper--loyalty');

if (sliderLoyality) {
  const loyalitySwiper = new Swiper(sliderLoyality, {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,
    slidesPerGroup: 1,
    speed: 1500,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
