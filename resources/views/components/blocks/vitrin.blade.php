<div {{ $attributes->merge([
    'class' => 'relative z-10 bg-primary text-white',
]) }}>
  <x-layouts.header />

  <div class="relative z-10 container flex flex-col py-14 md:py-16 lg:pt-24">
    <h1 class="flex flex-col text-center mb-6 md:gap-y-1">
      <span class="font-bold text-3xl sm:text-4xl md:text-5xl">{{ __('«Империя Знаний»') }}</span>
      <small class="font-medium text-xl sm:text-2xl md:text-3xl">
        {{ __('Академия STEEM - образования') }}
      </small>
    </h1>

    <a class="flex items-center justify-center max-w-max max-h-max min-w-8 min-h-8 mx-auto mb-14 sm:mb-16 lg:mb-24 text-white bg-blue-500 shadow-md transition-all duration-150 hover:shadow-none hover:bg-blue-600 rounded-md px-3 sm:min-h-10 sm:px-5" href="#about">
      {{ __('Больше о нас') }}
    </a>

    <div class="certificates lg:max-w-[920px] lg:mx-auto">
      <div class="swiper">
        <div class="swiper-wrapper flex items-center">
          @foreach (range(1, 7) as $key)
            <div class="swiper-slide">
              <a class="relative z-0 bg-blue-400 max-w-max max-h-max mx-auto flex rounded-md overflow-hidden" href="{{ asset("/images/certificates/$key.jpg") }}" target="_blank">
                <img class="w-[90px] h-auto object-contain" src="{{ asset("/images/certificates/$key.jpg") }}" width="80" height="80" alt="Сертификат">
                <div class="absolute top-0 left-0 w-full h-full bg-black opacity-0 hover:opacity-40 transition-all duration-150"></div>
              </a>
            </div>
          @endforeach
        </div>
      </div>

      <div class="swiper-pagination static flex justify-center mt-6 gap-x-2 lg:hidden"></div>
    </div>
  </div>
  <svg class="absolute top-0 left-0 w-full h-full z-0 text-blue-950 pointer-events-none">
    <use xlink:href="#vitrin-bg" />
  </svg>
</div>
