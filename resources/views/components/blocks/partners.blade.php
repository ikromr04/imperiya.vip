@php
  $partners = [
      [
          'title' => 'Abakus математика',
          'link' => 'https://abakus-center.com/',
          'logo' => 'abakus.png',
      ],
      [
          'title' => 'UNESCO Associated Schools',
          'link' => 'https://www.unesco.org/en/aspnet',
          'logo' => 'unesco.png',
      ],
      [
          'title' => 'PAMA Global Abacus & Mental Arithmetic Association',
          'link' => 'https://www.pamaglobal.org/',
          'logo' => 'pama.png',
      ],
      [
          'title' => 'The Eurasian Association of Organizations in Mental Arithmetic',
          'link' => 'https://www.facebook.com/eurasianmentalarithmetic/',
          'logo' => 'eaoma.png',
      ],
      [
          'title' => 'Школа инжиниринга и робототехники Robooky',
          'link' => 'https://www.instagram.com/robooky.kg/',
          'logo' => 'robooky.png',
      ],
  ];
@endphp

<section {{ $attributes->merge([
    'class' => 'relative z-0 container',
]) }}>
  <h2 class="title mb-6 md:mb-8 xl:mb-10 text-center">{{ __('Наши партнеры') }}</h2>

  <div class="partners max-w-[648px] mx-auto">
    <div class="swiper">
      <div class="swiper-wrapper flex items-center">
        @foreach ($partners as $partner)
          <div class="swiper-slide flex justify-center items-center">
            <a class="relative z-0 flex rounded-md overflow-hidden max-w-max max-h-max mx-auto transition-all duration-150 hover:opacity-80" href="{{ $partner['link'] }}" target="_blank">
              <img class="min-w-24 min-h-24 h-auto object-contain" src="{{ asset('/images/partners/' . $partner['logo']) }}" width="96" height="96" alt="{{ $partner['title'] }}">
            </a>
          </div>
        @endforeach
      </div>
    </div>

    <div class="swiper-pagination static flex justify-center mt-6 gap-x-2 md:hidden"></div>
  </div>
</section>
