<section class="container group" data-gallery-wrapper="1" id="gallery">
  <h2 class="title mb-4 text-center">{{ __('Фотогалерея') }}</h2>

  <ul class="flex flex-wrap justify-center gap-x-3 font-semibold text-gray-400 mb-4 sm:mb-6">
    <li>
      <button class="transition-all duration-300 group-[[data-gallery-wrapper='1']]:text-gray-800" type="button" onclick="this.closest('[data-gallery-wrapper]').setAttribute('data-gallery-wrapper', '1')">
        {{ __('Общие фото') }}
      </button>
    </li>
    <li>
      <button class="transition-all duration-300 group-[[data-gallery-wrapper='2']]:text-gray-800" type="button" onclick="this.closest('[data-gallery-wrapper]').setAttribute('data-gallery-wrapper', '2')">
        {{ __('Процесс обучения') }}
      </button>
    </li>
    <li>
      <button class="transition-all duration-300 group-[[data-gallery-wrapper='3']]:text-gray-800" type="button" onclick="this.closest('[data-gallery-wrapper]').setAttribute('data-gallery-wrapper', '3')">
        {{ __('Наши будни') }}
      </button>
    </li>
  </ul>

  <div class="relative">
    <div class="pswp-gallery grid grid-cols-2 gap-2 opacity-0 invisible transition-all duration-300 group-[[data-gallery-wrapper='1']]:visible group-[[data-gallery-wrapper='1']]:opacity-100 sm:grid-cols-4 sm:grid-rows-2" data-gallery>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg sm:col-span-2 sm:row-span-2">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/all/img1.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/all/img1.jpg') }}" alt="{{ __('Общие фото') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/all/img2.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/all/img2.jpg') }}" alt="{{ __('Общие фото') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/all/img3.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/all/img3.jpg') }}" alt="{{ __('Общие фото') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg sm:col-span-2 sm:aspect-auto">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/all/img4.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/all/img4.jpg') }}" alt="{{ __('Общие фото') }}" />
        </a>
      </div>
    </div>

    <div class="pswp-gallery grid grid-cols-2 gap-2 absolute top-0 left-0 w-full h-full opacity-0 invisible transition-all duration-300 group-[[data-gallery-wrapper='2']]:visible group-[[data-gallery-wrapper='2']]:opacity-100 sm:grid-cols-4 sm:grid-rows-2" data-gallery>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg sm:col-span-2 sm:row-span-2">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/process/img1.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/process/img1.jpg') }}" alt="{{ __('Процесс обучения') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/process/img2.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/process/img2.jpg') }}" alt="{{ __('Процесс обучения') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/process/img3.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/process/img3.jpg') }}" alt="{{ __('Процесс обучения') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg sm:col-span-2 sm:aspect-auto">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/process/img4.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/process/img4.jpg') }}" alt="{{ __('Процесс обучения') }}" />
        </a>
      </div>
    </div>

    <div class="pswp-gallery grid grid-cols-2 gap-2 absolute top-0 left-0 w-full h-full opacity-0 invisible transition-all duration-300 group-[[data-gallery-wrapper='3']]:visible group-[[data-gallery-wrapper='3']]:opacity-100 sm:grid-cols-4 sm:grid-rows-2" data-gallery>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg sm:col-span-2 sm:row-span-2">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/weekdays/img1.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/weekdays/img1.jpg') }}" alt="{{ __('Наши будни') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/weekdays/img2.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/weekdays/img2.jpg') }}" alt="{{ __('Наши будни') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/weekdays/img3.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/weekdays/img3.jpg') }}" alt="{{ __('Наши будни') }}" />
        </a>
      </div>
      <div class="relative w-full aspect-square overflow-hidden rounded-lg sm:col-span-2 sm:aspect-auto">
        <a class="absolute top-0 left-0 w-full h-full" href="{{ asset('/images/gallery/weekdays/img4.jpg') }}" data-pswp-width="900" data-pswp-height="900" target="_blank">
          <img class="object-cover absolute top-0 left-0 w-full h-full" src="{{ asset('/images/gallery/weekdays/img4.jpg') }}" alt="{{ __('Наши будни') }}" />
        </a>
      </div>
    </div>
  </div>
</section>
